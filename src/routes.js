import React from 'react';
import {Route, IndexRoute} from 'react-router';

import LayoutApp from './layouts/App';
import LayoutMain from './layouts/Main';
import LayoutPlay from './layouts/Play';

export default (store) => (
  <Route path="/" component={LayoutApp}>
    <IndexRoute component={LayoutMain} />
    <Route path="play" component={LayoutPlay} />
  </Route>
);