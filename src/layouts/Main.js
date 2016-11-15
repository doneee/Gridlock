import React from 'react';
import {Link} from 'react-router';

export default (props) => ({
  render () {
    return (
      <div className="layout-main">
        <Link to="/play">Play</Link>
      </div>
    );
  }
})