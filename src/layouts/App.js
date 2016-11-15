import React, {Component} from 'react';
import {Link} from 'react-router';

import '../styles/app.scss';

export default class App extends Component {
  render () {
    return (
      <div className="layout-app">
        {this.props.children}
        <Link to="/">Home</Link>
        <Link to="/play">Play</Link>
      </div>
    );
  }
}