import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import HardwareKeyboardArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import FlatButton from 'material-ui/FlatButton';

import View from 'containers/View';
import Game from 'components/Game';

import Puzzles from 'data/puzzles/';

import 'styles/containers/Play.scss';

class Play extends Component {

  constructor (props) {
    super(props);

    this.handleBackToSelect = this.handleBackToSelect.bind(this);
  }

  handleBackToSelect () {
    browserHistory.push('/select');
  }

  render () {
    const backToSelect = (
      <IconButton onTouchTap={this.handleBackToSelect}>
        <HardwareKeyboardArrowLeft  />
      </IconButton>
    );

    return (
      <View className="play" title={`Puzzle: ${Puzzles[this.props.params.id].name}`}
        iconElementLeft={backToSelect}>
        <Game id={this.props.params.id} />
      </View>
    );    
  }
}

export default Play;
