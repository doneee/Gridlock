import React from 'react';

import Playfield from './Playfield';

const Puzzle = [
  [0,0,0,0,0,0],
  [0,2,0,0,0,0],
  [0,0,0,0,0,0],
  [0,0,0,2,0,0],
  [0,0,0,0,0,0],
  [0,0,0,0,2,0],
]

class Game extends React.Component {

  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div>
        <Playfield height={6} width={6} playfield={Puzzle} />
      </div>
    );
  }
}

Game.propTypes = {

};

export default Game;