import React, { Component } from 'react';
import './App.css';
import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Button from './components/Button/Button';
import Spinner from './components/Loader/Spinner';
import pixabayApi from './components/Api/pixabayApi';

export default class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    status: 'idle',
    showBtnLoadMore: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { query, page, images } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.setState({
        status: 'pending',
      });

      pixabayApi(query, page)
        .then(results => {
          const showBtnLoadMore = this.checkImageLength(results);

          this.setState({
            images: [...images, ...results.hits],
            showBtnLoadMore,
            status: 'resolved',
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  handleSearchSubmit = query => {
    this.setState({
      query,
      images: [],
      page: 1,
    });
  };

  checkImageLength = results => {
    return !(results.hits.length < 12 && results.totalHits <= 12);
  };

  handleLoadMoreBtn = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { images, status, showBtnLoadMore } = this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.handleSearchSubmit} />
        <ImageGallery items={images} toggleModal={this.toggleModal} />
        {status === 'pending' && <Spinner />}
        {status !== 'pending' && showBtnLoadMore && (
          <Button onClick={this.handleLoadMoreBtn} />
        )}
      </div>
    );
  }
}
