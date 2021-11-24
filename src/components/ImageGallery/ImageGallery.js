import React, { Component } from 'react';
import PropTypes, { string } from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Modal from '../Modal/Modal';

import s from './ImageGallery.module.css';

export default class ImageGallery extends Component {
  state = {
    imgIndex: null,
    showModal: false,
  };

  handleClick(index) {
    this.setState({ imgIndex: index, showModal: true });
  }

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    return (
      <>
        <ul className={s.gallery}>
          {this.props.items.map((item, index) => (
            <ImageGalleryItem
              key={index}
              item={item}
              onClick={() => {
                this.handleClick(index);
              }}
            />
          ))}
        </ul>
        {this.state.showModal && (
          <Modal onCloseModal={this.toggleModal}>
            <img
              src={this.props.items[this.state.imgIndex].largeImageURL}
              alt={this.props.items[this.state.imgIndex].tags}
            />
          </Modal>
        )}
      </>
    );
  }
}
