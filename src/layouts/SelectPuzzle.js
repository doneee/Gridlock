import React, {Component} from 'react';
import {Link} from 'react-router';
import FlatButton from 'material-ui/FlatButton';

import PuzzleSelector from 'components/PuzzleSelector';

class SelectPuzzle extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    console.log(this.props);
    return (
      <div className="layout-select-puzzle">
        <PuzzleSelector />
      </div>
    );
  }
}

export default SelectPuzzle;
