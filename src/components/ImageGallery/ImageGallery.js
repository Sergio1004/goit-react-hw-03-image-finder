import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
    const { items } = this.props;
    const { imgIndex } = this.state;

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
              src={items[imgIndex].largeImageURL}
              alt={items[imgIndex].tags}
            />
          </Modal>
        )}
      </>
    );
  }
}

ImageGallery.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
};
