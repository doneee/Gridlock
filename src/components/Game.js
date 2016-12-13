import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import Playfield from 'components/Playfield';
import Puzzles from 'data/puzzles/';

import 'styles/components/Game.scss';

class Game extends Component {

  constructor (props) {
    super(props);

    this.toggleEditMode = this.toggleEditMode.bind(this);
    this.handleOnPuzzleDone = this.handleOnPuzzleDone.bind(this);
    this.restartGame = this.restartGame.bind(this);

    this._playfieldInstance = null;

    this.state = {
      editMode: false,
      gameOverDialog: false
    };
  }

  toggleEditMode (e) {
    this.setState({editMode: e.target.checked});
  }

  handleOnPuzzleDone (successful) {
    this.setState({
      gameOverDialog: successful ? 'successful' : 'unsuccessful'
    });
  }

  restartGame () {
    this._playfieldInstance && this._playfieldInstance.restartGame();
  }

  render () {
    return (
      <div className="play-gridlock">
        <Playfield ref={(instance) => this._playfieldInstance = instance}
          playfield={Puzzles[this.props.id].puzzle} 
          editMode={this.state.editMode}
          onPuzzleDone={this.handleOnPuzzleDone} />
          {this.renderResultDialog()}
          <button onTouchTap={this.restartGame}>Reset</button>
      </div>
    );
  }

  renderResultDialog () {
    if (!this.state.gameOverDialog) return;
    let dialogTitle = this.state.gameOverDialog === 'successful' ? 'Success!' : 'You Lost!'
    let actions = [
      <FlatButton onTouchTap={() => browserHistory.push('/select')}>Back to Level Select</FlatButton>,
      <FlatButton>Try Again</FlatButton>,
      <FlatButton>Next Level</FlatButton>
    ];

    return (
      <Dialog title={dialogTitle} actions={actions} open={true} />
    )
  }
}

Game.propTypes = {

};

export default Game;