import React, {Component} from 'react';
import {Link} from 'react-router';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

import '../styles/layouts/Main.scss';
import ImageLogo from '../icon.png';

class Main extends Component {
  constructor (props) {
    super(props);

    this.state = {
      dialogs: {
        about: false,
        howToPlay: false
      }
    };

    this.handleDialogState = this.handleDialogState.bind(this);
  }

  handleDialogState (dialog, open = false) {
    if (!Object.keys(this.state.dialogs).includes(dialog)) return;

    this.setState({
      dialogs: {
        ...this.state.dialogs,
        [dialog]: open
      }
    });
  }


  render () {
    return (
      <div className="layout-main">
        <img className="logo-main" src={ImageLogo} />
        <h1 className="title-main">Gridlock</h1>
        <div className="container-action-buttons">
          <div className="action-button"><Link to="/play"><FlatButton label="Play" primary /></Link></div>
          <div className="action-button"><Link to="/create"><FlatButton label="Level Creator" /></Link></div>
          <div className="action-button">
            <FlatButton label="How to Play" onTouchTap={() => this.handleDialogState('howToPlay', true)} /></div>
          <div className="action-button">
            <FlatButton label="About" onTouchTap={() => this.handleDialogState('about', true)} /></div>
        </div>
        {this.renderAboutDialog()}
        {this.renderHowToPlayDialog()}
      </div>
    );
  }

  renderAboutDialog () {
    const actions = [
      <FlatButton
        label="Okay"
        primary={true}
        keyboardFocused={true}
        onTouchTap={() => this.handleDialogState('about', false)}
      />,
    ];

    return (
      <Dialog title="About this game"
        open={this.state.dialogs.about}
        actions={actions}
        onRequestClose={() => this.handleDialogState('howToPlay', false)}>
        <p>This is a simple puzzle game written in JavaScript, developed with React and supporting libraries.
          It also serves as a basic boilerplate for creating a new React application with routing and a
          Redux store.</p>

        <p>You can check out the source on <a href="http://github.com/doneee/Gridlock/">Github</a>.</p>

        <p>Created by: Donny Swany &lt;donny@leetprog.com&gt;</p>
      </Dialog>
    );
  }

  renderHowToPlayDialog () {
    const actions = [
      <FlatButton
        label="Okay"
        primary={true}
        keyboardFocused={true}
        onTouchTap={() => this.handleDialogState('howToPlay', false)}
      />,
    ];

    return (
      <Dialog title="How to play"
        open={this.state.dialogs.howToPlay}
        actions={actions}
        onRequestClose={() => this.handleDialogState('howToPlay', false)}>
        <p>The objective is to fill the entire grid. Select a starting point, then direct the selected block
          around the playfield until you fill the entire grid. The block will only stop when it hits the wall,
          or another block.</p>
      </Dialog>
    );
  }
}

export default Main;
