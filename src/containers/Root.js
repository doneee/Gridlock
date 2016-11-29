import React, {Component, PropTypes} from 'react';
import {Provider} from 'react-redux';
import {Router, Route} from 'react-router';
import muiTheme from '../styles/muiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { RouteTransition } from 'react-router-transition';

import routes from '../routes';

import 'styles/containers/Root.scss';

export default class Root extends Component {

  generateRoutes () {
    const TransitionWrapper = (props) => (
      <RouteTransition
        {...props}
        pathname={props.location.pathname}
        atEnter={{opacity: 0}}
        atLeave={{opacity: 0}}
        atActive={{opacity: 1}}>
      </RouteTransition>
    );

    return (
      <Route path="/"
        component={TransitionWrapper}
        children={routes} />
    );
  }

  render () {
    const {store, history} = this.props;

    return (
      <Provider store={store}>
        <MuiThemeProvider muiTheme={getMuiTheme(muiTheme)}>
          <Router history={history} routes={this.generateRoutes()} />
        </MuiThemeProvider>
      </Provider>
    );
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};