import React from 'react';

import Game from '../components/Game';

export default (props) => ({
  render () {
    return (
      <div className="layout-play">
        <Game />
      </div>
    );
  }
})