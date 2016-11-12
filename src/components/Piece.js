import React, {PropTypes, Component} from 'react';

import PieceTypes, {PieceClasses} from '../enums/PieceTypes';

import '../styles/Piece.scss';

class Piece extends Component {

  constructor(props) {
    super(props);

    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.handleDirectionTap = this.handleDirectionTap.bind(this);
  }

  handleTouchTap (e) {
    this.props.pieceTapped(this.props.position, 1);
  }

  handleDirectionTap (direction, e) {
    console.log(direction, e.type);
  }

  render () {
    let {started, pieceState, pieceActive} = this.props;

    let directions = this.props.getValidDirections(this.props.position);
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
  started: PropTypes.bool,
  getValidDirections: PropTypes.func
};

Piece.defaultProps = {
  position: [0, 0],
  pieceState: 0,
  pieceActive: false,
  pieceTapped: () => {},
  rows: 0,
  columns: 0,
  started: false,
  getValidDirections: () => {}
}

export default Piece;