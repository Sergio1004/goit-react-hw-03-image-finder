import React, { Component } from 'react';
import Loader from 'react-loader-spinner';

import s from './Spinner.module.css';

export default class Spinner extends Component {
  render() {
    return (
      <div className={s.spinnerWrapper}>
        <Loader
          type="Bars"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={3000}
        />
      </div>
    );
  }
}
