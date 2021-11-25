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
    loadMore: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { query, page, images } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.setState({
        status: 'pending',
      });

      pixabayApi(query, page)
        .then(results => {
          const resultsLength = results.hits.length;
          const loadMore = this.checkImageLength(resultsLength);

          this.setState({
            images: [...images, ...results.hits],
            loadMore,
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

  checkImageLength = resultsLength => {
    return !(resultsLength < 12);
  };

  handleLoadMoreBtn = () => {
    this.setState(() => ({ page: this.state.page + 1 }));
  };

  render() {
    const { images, status, loadMore } = this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.handleSearchSubmit} />
        <ImageGallery items={images} toggleModal={this.toggleModal} />
        {status === 'pending' && <Spinner />}
        {status === 'resolved' && loadMore && (
          <Button onClick={this.handleLoadMoreBtn} />
        )}
      </div>
    );
  }
}
