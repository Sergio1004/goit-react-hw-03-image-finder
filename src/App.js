import React, { Component } from 'react';
import './App.css';
import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Button from './components/Button/Button';
import pixabayApi from './components/Api/pixabayApi';

export default class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    status: 'idle',
    error: null,
    loadMore: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { query, page, images, isLoadMore } = this.state;
    if (prevState.query !== query) {
      this.setState({
        status: 'pending',
      });

      pixabayApi(query)
        .then(results => {
          const resultsLength = results.hits.length;
          this.setState({
            images: [...results.hits],
            isLoadMore,
            status: 'resolved',
          });
        })
        .catch(error => {
          this.setState({ error, status: 'rejected' });
        });
    }
    if (prevState.page !== page) {
      pixabayApi(page).then(results => {
        const resultsLength = results.hits.length;
        if (resultsLength === 0) {
          this.setState({
            error: new Error(`No search results for ${query}`),
            status: 'rejected',
          });
          return;
        }
        this.setState({
          images: [...images, ...results.hits],
          isLoadMore,
          status: 'resolved',
        });
      });
    }
  }

  handleSearchSubmit = query => {
    this.setState({
      query,
      page: 1,
    });
  };

  isLoadMore = resultsLength => {
    return !(resultsLength < 12);
  };

  handleLoadMoreBtn = () => {
    this.setState(() => ({ page: this.state.page + 1 }));
  };

  render() {
    const { images, status } = this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.handleSearchSubmit} />
        <ImageGallery items={images} toggleModal={this.toggleModal} />
        {status === 'resolved' && <Button onClick={this.handleLoadMoreBtn} />}
      </div>
    );
  }
}
