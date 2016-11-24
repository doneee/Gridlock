import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import {Link} from 'react-router';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import HardwareKeyboardArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left';

import AppFrame from 'components/AppFrame';
import PuzzleSelector from 'components/PuzzleSelector';

class SelectPuzzle extends Component {
  constructor (props) {
    super(props);
    this.handleBackToMain = this.handleBackToMain.bind(this);
  }

  handleBackToMain () {
    console.log('fucking push');
    browserHistory.push('/');
  }

  render () {
    console.log(this.handleBackToMain);
    let backButton = (
      <IconButton>
        <HardwareKeyboardArrowLeft alt="test" onTouchTap={() => {console.log('press'); this.handleBackToMain()}} />
      </IconButton>
    );

    return (
      <AppFrame key="select" title="Select a Puzzle"
        iconElementLeft={backButton}>
        <div className="layout-select-puzzle">
          <PuzzleSelector />
        </div>
      </AppFrame>
    );
  }
}

export default SelectPuzzle;
