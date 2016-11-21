import React, {Component} from 'react';

import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import HardwareKeyboardArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import FlatButton from 'material-ui/FlatButton';

import Game from '../components/Game';

import '../styles/layouts/Play.scss';

class Play extends Component {

  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div className="layout-play">
        <Game />
      </div>
    );    
  }
}

export default Play;
