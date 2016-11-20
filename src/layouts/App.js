import React, {Component} from 'react';
import {Link} from 'react-router';
import muiTheme from '../styles/muiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {AppBar} from 'material-ui';

import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import HardwareKeyboardArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import FlatButton from 'material-ui/FlatButton';



import '../styles/layouts/App.scss';

export default class App extends Component {
  constructor (props) {
    super(props);

    this.handleBackTap = this.handleBackTap.bind(this);
  }

  handleBackTap () {
    this.props.router.push('/');
  }

  render () {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(muiTheme)}>
        <div className="layout-app">
          {this.renderAppBar()}
          <div className="layout-app-content">
            {this.props.children}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }

  renderAppBar () {
    let isMainPage = this.props.location.pathname == '/';

    let backButton = (
      <IconButton onClick={this.handleBackTap}>
        <HardwareKeyboardArrowLeft />
      </IconButton>
    );

    if (!isMainPage) {
      return (
        <AppBar title="Gridlock"
          iconElementLeft={backButton} />
      );
    }
  }
}