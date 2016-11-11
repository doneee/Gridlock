import React, {PropTypes, Component} from 'react';

import PieceTypes, {PieceClasses} from '../enums/PieceTypes';

import '../styles/Piece.scss';

class Piece extends Component {

  constructor(props) {
    super(props);

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.getValidDirections = this.getValidDirections.bind(this);
  }

  handleMouseDown (e) {
    this.props.pieceTapped(this.props.position, 1);
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
    let {pieceState, pieceActive} = this.props;

    let directions = this.getValidDirections();

    if (pieceActive) console.log(directions);
    return (
      <div 
        className={`piece ${PieceClasses[pieceState]} ${pieceActive ? 'piece-active' : ''}`}
        style={{height: 'calc(100% / 6)', width: 'calc(100% / 6)'}}
        onMouseDown={this.handleMouseDown} />
    );
  }
}

Piece.propTypes = {
  position: PropTypes.arrayOf(PropTypes.number),
  pieceState: PropTypes.number,
  pieceActive: PropTypes.bool,
  pieceTapped: PropTypes.func,
  rows: PropTypes.number,
  columns: PropTypes.number
};

Piece.defaultProps = {
  position: [0, 0],
  pieceState: 0,
  pieceActive: false,
  pieceTapped: () => {},
  rows: 0,
  columns: 0
}

export default Piece;