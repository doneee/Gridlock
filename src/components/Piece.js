import React, {PropTypes, Component} from 'react';

import PieceTypes, {PieceClasses} from '../enums/PieceTypes';
import GAME_STATE from '../enums/GameState';

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
    let {gameState, pieceState, pieceActive} = this.props;

    let directions = this.props.getValidDirections(this.props.position);
    let directionButtons = [];

    if ((gameState === GAME_STATE.STARTED) && pieceActive) {
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
  pieceState: PropTypes.oneOf(Object.values(PieceTypes)),
  pieceActive: PropTypes.bool,
  pieceTapped: PropTypes.func,
  rows: PropTypes.number,
  columns: PropTypes.number,
  gameState: PropTypes.oneOf(Object.values(GAME_STATE)),
  getValidDirections: PropTypes.func
};

Piece.defaultProps = {
  position: [0, 0],
  pieceState: 0,
  pieceActive: false,
  pieceTapped: () => {},
  rows: 0,
  columns: 0,
  gameState: GAME_STATE.UNSTARTED,
  getValidDirections: () => ({ up: true, down: true, left: true, right: true })
}

export default Piece;