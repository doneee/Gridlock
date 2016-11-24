import React from 'react';
import {Route, IndexRoute} from 'react-router';

import LayoutMain from 'containers/Main';
import LayoutPlay from 'containers/Play';
import LayoutSelectPuzzle from 'containers/SelectPuzzle';

export default [
  <Route path="/" component={LayoutMain} />,
  <Route path="play/:id" component={LayoutPlay} />,
  <Route path="select" component={LayoutSelectPuzzle} />
];