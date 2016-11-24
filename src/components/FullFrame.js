import React, {Component, PropTypes} from 'react';

class FullFrame extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div className="layout-app">
        <div className="layout-app-content">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default FullFrame;