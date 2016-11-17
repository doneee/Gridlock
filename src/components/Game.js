import React, {Component} from 'react';

// import injectTapEventPlugin from 'react-tap-event-plugin';
// injectTapEventPlugin();

import Playfield from './Playfield';

const Puzzle = [
  [0,0,0,0,0,0],
  [0,2,0,0,0,0],
  [0,0,0,2,0,0],
  [0,0,0,2,0,0],
  [0,2,0,0,0,0],
  [0,0,0,0,0,0],
];

class Game extends Component {

  constructor (props) {
    super(props);

    this.toggleEditMode = this.toggleEditMode.bind(this);

    this.state = {
      editMode: false
    };
  }

  toggleEditMode (e) {
    this.setState({editMode: e.target.checked});
  }

  render () {
    return (
      <div>
        <Playfield playfield={Puzzle} editMode={this.state.editMode} />
        <div><input type="checkbox" onClick={this.toggleEditMode} /> Edit Mode</div>
      </div>
    );
  }
}

Game.propTypes = {

};

export default Game;