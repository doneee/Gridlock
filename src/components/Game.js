import React, {Component} from 'react';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import Playfield from './Playfield';

const Puzzle = [
  [0,0,0,0,0,0],
  [0,2,0,0,0,0],
  [0,0,0,0,0,0],
  [0,0,0,2,0,0],
  [0,0,0,0,0,0],
  [0,0,0,0,2,0],
];

class Game extends Component {

  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div>
        <Playfield playfield={Puzzle} />
      </div>
    );
  }
}

Game.propTypes = {

};

export default Game;