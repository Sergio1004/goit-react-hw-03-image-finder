import React, { Component } from "react";
import PropTypes, { resetWarningCache } from "prop-types";

export default class SearchBar extends Component {
  state = {
      query = '',
  };

  handleChange = e => {
    this.setState({query: e.target.value});
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.query.trim() === '') {
      return;
    }
    this.props.onSubmit(this.state.query);
    reset();
  };

  reset = () => {
    this.setState({query = ''});
  };

  render() {
    return(
      <header className="searchbar">
        <form className="form" onSubmit={this.handleSubmit}>
          <button type="submit" className="button">
            <span className="button-label">Search</span>
          </button>
  
          <input
            className="input"
            type="text"
            autocomplete="off"
            autofocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

SearchBar.PropTypes = {
  onSubmit: PropTypes.func.isRequired,
};