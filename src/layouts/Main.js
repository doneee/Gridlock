import React from 'react';
import {Link} from 'react-router';
import {FlatButton} from 'material-ui';

import '../styles/layouts/Main.scss';
import ImageLogo from '../icon.png';

export default (props) => ({
  render () {
    return (
      <div className="layout-main">
        <img className="logo-main" src={ImageLogo} />

        <h1 className="title-main">Gridlock</h1>

        <div className="container-action-buttons">
          <div className="action-button"><Link to="/play"><FlatButton label="Play" primary /></Link></div>
          <div className="action-button"><Link to="/create"><FlatButton label="Level Creator" /></Link></div>
          <div className="action-button"><Link to="/howtoplay"><FlatButton label="How to Play" /></Link></div>
          <div className="action-button"><Link to="/about"><FlatButton label="About" /></Link></div>
        </div>

        
      </div>
    );
  }
})