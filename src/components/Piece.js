import React, {PropTypes, Component} from 'react';

import PieceTypes, {PieceClasses} from '../enums/PieceTypes';

import '../styles/Piece.scss';

class Piece extends Component {

  constructor(props) {
    super(props);

    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.handleDirectionTap = this.handleDirectionTap.bind(this);
    this.getValidDirections = this.getValidDirections.bind(this);
  }

  handleTouchTap (e) {
    this.props.pieceTapped(this.props.position, 1);
  }

  handleDirectionTap (direction, e) {
    console.log(direction, e.type);
  }

  getValidDirections () {
    let {rows, columns, position, playfield} = this.props;

    return {
      up: !((position[0] < 1) || (playfield[position[0] - 1][position[1]] !== PieceTypes.Free)),
      down: !((position[0] > rows - 2) || (playfield[position[0] + 1][position[1]] !== PieceTypes.Free)),
      left: !((position[1] < 1) || (playfield[position[0]][position[1] - 1] !== PieceTypes.Free)),
      right: !((position[1] > columns - 2) || (playfield[position[0]][position[1] + 1] !== PieceTypes.Free))
    }

  }

  render () {
    let {started, pieceState, pieceActive} = this.props;

    let directions = this.getValidDirections();
    let directionButtons = [];

    if (started && pieceActive) {
      directionButtons = Object.keys(directions)
        .map((direction) => directions[direction] ? 
          <div key={direction} className={`move ${direction}`} onMouseDown={this.handleDirectionTap.bind(null, direction)} /> : '');      
    }

    return (
      <div 
        className={`piece ${PieceClasses[pieceState]} ${pieceActive ? 'piece-active' : ''}`}
        style={{height: 'calc(100% / 6)', width: 'calc(100% / 6)'}}
        onTouchTap={this.handleTouchTap}>
          {directionButtons}
        </div>
    );
  }
}

Piece.propTypes = {
  position: PropTypes.arrayOf(PropTypes.number),
  pieceState: PropTypes.number,
  pieceActive: PropTypes.bool,
  pieceTapped: PropTypes.func,
  rows: PropTypes.number,
  columns: PropTypes.number,
  started: PropTypes.bool
};

Piece.defaultProps = {
  position: [0, 0],
  pieceState: 0,
  pieceActive: false,
  pieceTapped: () => {},
  rows: 0,
  columns: 0,
  started: false
}

export default Piece;