import React, {Component, PropTypes} from 'react';
import AppBar from 'material-ui/AppBar';

import 'styles/layouts/App.scss';

class AppFrame extends Component {
  constructor (props) {
    super(props);
  }

  componentDidMount () {
    console.log('mounted');
  }

  render () {
    return (
      <div className="layout-app">
        {this.renderAppBar()}
        <div className="layout-app-content">
          {this.props.children}
        </div>
      </div>
    );
  }

  renderAppBar () {
    return (
      <AppBar key={this.props.title} title={this.props.title}
        iconElementLeft={this.props.iconElementLeft} />
    );
  }
}

AppFrame.propTypes = {
  title: PropTypes.string,
  iconElementLeft: PropTypes.object
};

AppFrame.defaultProps = {
  title: '',
  iconElementLeft: null
};

export default AppFrame;