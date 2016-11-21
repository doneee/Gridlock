import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import {Router, browserHistory} from 'react-router';
import {syncHistoryWithStore, routerReducer} from 'react-router-redux';

import makeRoutes from './routes';
import * as reducers from './reducers/';


import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const store = createStore(
  combineReducers({
    ...reducers,
    routing: routerReducer
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const routes = makeRoutes(store);
const history = syncHistoryWithStore(browserHistory, store);


const Root = (
  <Provider store={store}>
    <Router history={history}>
      {routes}
    </Router>
  </Provider>
);

const entryPoint = document.getElementById('root');
ReactDOM.render(Root, entryPoint);
document.body.classList.remove('uninitialized');
