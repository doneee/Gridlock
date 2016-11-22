import React, {PropTypes, Component} from 'react';
import {browserHistory} from 'react-router';
import Puzzles from 'data/puzzles/';

import 'styles/components/PuzzleSelector.scss';

class PuzzleSelector extends Component {

  constructor(props) {
    super(props);

    this.navigateToPuzzle = this.navigateToPuzzle.bind(this);
    this.renderPuzzleItems = this.renderPuzzleItems.bind(this);
  }

  navigateToPuzzle (id) {
    browserHistory.push(`/play/${id}`);
  }

  render () {
    return (
      <div className="puzzle-selector">
        {this.renderPuzzleItems()}
      </div>
    );
  }

  renderPuzzleItems () {
    return Object.values(Puzzles).map((puzzle) =>
      (
        <div key={puzzle.id} className="puzzle-selector-item"
          onTouchTap={() => this.navigateToPuzzle(puzzle.id)}>
          <span className="puzzle-name">{puzzle.name}</span>
        </div>
      )
    );
  }
}

PuzzleSelector.propTypes = {

};

PuzzleSelector.defaultProps = {

};

export default PuzzleSelector;