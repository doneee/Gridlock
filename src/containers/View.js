import React, {Component, PropTypes} from 'react';
import AppBar from 'material-ui/AppBar';

import 'styles/containers/View.scss';

class View extends Component {
  constructor (props) {
    super(props);
    console.log(this.props.iconElementLeft);
  }

  componentDidMount () {

  }

  componentWillUnmount() {
    console.log('unmount', this.props.className);
  }

  render () {
    return (
      <div className="view">
        {this.renderAppBar()}
        <div className={`view-content ${this.props.className}`}>
          {this.props.children}
        </div>
      </div>
    );
  }

  renderAppBar () {
    if (this.props.showAppBar) {
      return (
        <AppBar key={this.props.className} title={this.props.title}
          iconElementLeft={this.props.iconElementLeft} />
      );
    }
  }
}

View.propTypes = {
  className: PropTypes.string,
  showAppBar: PropTypes.bool,
  title: PropTypes.string,
  iconElementLeft: PropTypes.object
};

View.defaultProps = {
  className: '',
  showAppBar: true,
  title: '',
  iconElementLeft: null
};

export default View;