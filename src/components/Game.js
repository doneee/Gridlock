import React, {Component} from 'react';

import Playfield from './Playfield';
import Puzzles from 'data/puzzles/';
import '../styles/components/Game.scss';

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
      <div className="play-gridlock">
        <Playfield playfield={Puzzles[this.props.id].puzzle} editMode={this.state.editMode} />
      </div>
    );
  }
}

Game.propTypes = {

};

export default Game;