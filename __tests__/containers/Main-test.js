// Link.react-test.js
import React from 'react';
import renderer from 'react-test-renderer';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import muiTheme from 'styles/muiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import LayoutMain from 'containers/Main';

describe('<Main />', () => {
  it('renders with default props', () => {
    const component = renderer.create(
        <MuiThemeProvider muiTheme={getMuiTheme(muiTheme)}>
          <LayoutMain />        
        </MuiThemeProvider>

    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
