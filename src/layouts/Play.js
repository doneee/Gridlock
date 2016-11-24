import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import HardwareKeyboardArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import FlatButton from 'material-ui/FlatButton';

import AppFrame from 'components/AppFrame';
import Game from 'components/Game';

import 'styles/layouts/Play.scss';

class Play extends Component {

  constructor (props) {
    super(props);

    this.handleBackToSelect = this.handleBackToSelect.bind(this);
  }

  handleBackToSelect () {
    browserHistory.push('/select');
  }

  render () {
    let backButton = (
      <IconButton>
        <HardwareKeyboardArrowLeft onTouchTap={this.handleBackToSelect} />
      </IconButton>
    );

    return (
      <AppFrame key="play" title="Play"
        iconElementLeft={backButton}>
        <div className="layout-play">
          <Game id={this.props.params.id} />
        </div>
      </AppFrame>
    );    
  }
}

export default Play;
