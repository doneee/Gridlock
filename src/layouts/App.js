import React, {Component} from 'react';
import muiTheme from '../styles/muiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import 'styles/layouts/App.scss';

export default class App extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(muiTheme)}>
        {this.props.children}
      </MuiThemeProvider>
    );
  }
}