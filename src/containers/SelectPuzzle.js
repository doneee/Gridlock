import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import {Link} from 'react-router';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import HardwareKeyboardArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left';

import View from 'containers/View';
import PuzzleSelector from 'components/PuzzleSelector';

class SelectPuzzle extends Component {
  constructor (props) {
    super(props);
    this.handleBackToMain = this.handleBackToMain.bind(this);
  }

  handleBackToMain () {
    browserHistory.push('/');
  }

  render () {
    const backButton = (
      <IconButton onTouchTap={this.handleBackToMain}>
        <HardwareKeyboardArrowLeft />
      </IconButton>
    );

    return (
      <View className="select-puzzle" title="Select a Puzzle"
        iconElementLeft={backButton}>
        <PuzzleSelector />
      </View>
    );
  }
}

export default SelectPuzzle;
