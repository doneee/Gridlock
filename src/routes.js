import React from 'react';
import {Route, IndexRoute} from 'react-router';

import LayoutApp from 'layouts/App';
import LayoutMain from 'layouts/Main';
import LayoutPlay from 'layouts/Play';
import LayoutSelectPuzzle from 'layouts/SelectPuzzle';

export default (store) => (
  <Route path="/" component={LayoutApp}>
    <IndexRoute component={LayoutMain} />
    <Route path="play/:id" component={LayoutPlay} />
    <Route path="select" component={LayoutSelectPuzzle} />
  </Route>
);