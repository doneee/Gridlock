import React, {PropTypes, Component} from 'react';
import KeyCode from 'keycode-js';
import Piece from './Piece';

import PieceTypes from '../enums/PieceTypes';

import '../styles/Playfield.scss';

class Playfield extends Component {

  constructor (props) {
    super(props);

    this.startGame = this.startGame.bind(this);
    this.updatePieceState = this.updatePieceState.bind(this);
    this.handlePieceTapped = this.handlePieceTapped.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.moveCursor = this.moveCursor.bind(this);
    this.updateCursorPosition = this.updateCursorPosition.bind(this);
    this.getValidDirections = this.getValidDirections.bind(this);
    this.hasValidMove = this.hasValidMove.bind(this);
    this.isPuzzleCompleted = this.isPuzzleCompleted.bind(this);

    document.addEventListener('keydown', this.handleKeyDown);

    this.state = {
      cursorPosition: [0, 0],
      started: false,
      playfield: props.playfield || new Array(props.height).fill(new Array(props.width).fill(PieceTypes.Free))
    };
  }

  componentDidUpdate(prevProps, prevState) {

  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handlePieceTapped (position) {
    let [row, column] = position;
    if (!this.state.started) {

      if (this.state.cursorPosition.every((v, i) => v === position[i])) {
        this.startGame();
        this.updatePieceState(position, PieceTypes.Used);

      } else if (this.state.playfield[row][column] === PieceTypes.Free) {
        this.updateCursorPosition(position);

      }
    }
  }

  handleKeyDown (e) {
    !this.state.started ? this.moveCursor(e.keyCode) : this.doMoveAction(e.keyCode);
  }

  moveCursor (direction) {
    let {cursorPosition, playfield, started} = this.state;

    switch (direction) {
      case KeyCode.KEY_UP: {
        if (cursorPosition[0] > 0) this.updateCursorPosition([cursorPosition[0] - 1, cursorPosition[1]]);
        break;
      }

      case KeyCode.KEY_DOWN: {
        if (cursorPosition[0] < playfield.length - 1) this.updateCursorPosition([cursorPosition[0] + 1, cursorPosition[1]]);
        break;
      }

      case KeyCode.KEY_LEFT: {
        if (cursorPosition[1] > 0) this.updateCursorPosition([cursorPosition[0], cursorPosition[1] - 1]);
        break;
      }

      case KeyCode.KEY_RIGHT: {
        if (cursorPosition[1] < playfield[0].length - 1) this.updateCursorPosition([cursorPosition[0], cursorPosition[1] + 1]);
        break;
      }

      case KeyCode.KEY_RETURN: {
        let [row, column] = cursorPosition;
        if (! started && playfield[row][column] === PieceTypes.Free) {
          this.updatePieceState(cursorPosition, PieceTypes.Used);
          this.startGame();
        }
        break;
      }
    }
  }

  doMoveAction (direction) {
    let {started, cursorPosition} = this.state;
    let validMoves = this.getValidDirections(cursorPosition);

    if (!started) return;

    switch (direction) {
      case KeyCode.KEY_LEFT: {
        if (validMoves.left) {
          let nextCursorPosition = [
            cursorPosition[0], 
            cursorPosition[1] - 1
          ];
          this.updatePieceState(nextCursorPosition, PieceTypes.Used);
          this.updateCursorPosition(nextCursorPosition);
          window.setTimeout(() => this.doMoveAction(direction), 100);
          return;
        }
        break;
      }

      case KeyCode.KEY_RIGHT: {
        if (validMoves.right) {
          let nextCursorPosition = [
            cursorPosition[0], 
            cursorPosition[1] + 1
          ];
          this.updatePieceState(nextCursorPosition, PieceTypes.Used);
          this.updateCursorPosition(nextCursorPosition);
          window.setTimeout(() => this.doMoveAction(direction), 100);
          return;
        }
        break;
      }

      case KeyCode.KEY_UP: {
        if (validMoves.up) {
          let nextCursorPosition = [
            cursorPosition[0] - 1, 
            cursorPosition[1]
          ];
          this.updatePieceState(nextCursorPosition, PieceTypes.Used);
          this.updateCursorPosition(nextCursorPosition);
          window.setTimeout(() => this.doMoveAction(direction), 100);
          return;
        }
        break;
      }

      case KeyCode.KEY_DOWN: {
        if (validMoves.down) {
          let nextCursorPosition = [
            cursorPosition[0] + 1, 
            cursorPosition[1]
          ];
          this.updatePieceState(nextCursorPosition, PieceTypes.Used);
          this.updateCursorPosition(nextCursorPosition);
          window.setTimeout(() => this.doMoveAction(direction), 100);
          return;
        }
        break;
      }
    }

    let puzzleCompleted = this.isPuzzleCompleted();
    let hasValidMove = this.hasValidMove();

    if (puzzleCompleted || !hasValidMove) {
      this.props.onPuzzleDone(puzzleCompleted);
    }
  }

  updateCursorPosition(position) {
    this.setState({ cursorPosition: position });
  }

  startGame () {
    this.setState({ started: true });
  }

  updatePieceState ([row, column], state, delay = 0) {
    let {playfield} = this.state;

    this.setState({
      playfield: [
        ...playfield.slice(0, row),
        [
          ...playfield[row].slice(0, column),
          state,
          ...playfield[row].slice(column + 1)
        ],
        ...playfield.slice(row + 1)
      ]
    });
  }

  getValidDirections ([row, column]) {
    let {width, height} = this.props;
    let {playfield} = this.state;
    return ({
      up: (row > 0) && (playfield[row - 1][column] === PieceTypes.Free),
      down: (row < width - 1) && (playfield[row + 1][column] === PieceTypes.Free),
      left: (column > 0) && (playfield[row][column - 1] === PieceTypes.Free),
      right: (column < height - 1) && (playfield[row][column + 1] === PieceTypes.Free)
    });
  }

  hasValidMove () {
    // Check to see if at least one value is true
    return Object.values(this.getValidDirections(this.state.cursorPosition))
      .some((v) => v === true);
  }

  isPuzzleCompleted () {
    // Iterate through and check to see if there are any free blocks
    return this.state.playfield.every((pieceRow) => pieceRow.every((piece) => piece !== PieceTypes.Free));
  }

  render () {
    let {started} = this.state;
    return (
      <div className={`playfield ${started ? 'started' : 'unstarted'}`}>
        {this.renderRows()}
      </div>
    );
  }

  renderRows () {
    let {height} = this.props;
    let pieces = [];

    for (let i = 0; i < height; i++) {
      pieces.push.apply(pieces, this.renderRow(i));
    }

    return pieces;
  }

  renderRow (row) {
    let {height, width} = this.props;
    let {playfield, cursorPosition, started} = this.state;
    let pieces = [];

    for (let column = 0; column < width; column++) {
      pieces.push(
        <Piece key={`${row},${column}`} 
          position={[row, column]} 
          pieceState={playfield[row][column]}
          pieceActive={[row, column].every((v, i) => v === cursorPosition[i])}
          playfield={playfield}
          getValidDirections={this.getValidDirections}
          started={started}
          rows={height}
          columns={width}
          pieceTapped={this.handlePieceTapped} />
      );
    }

    return pieces;
  }
}

Playfield.propTypes = {
  playfield: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
  width: PropTypes.number,
  height: PropTypes.number,
  onPuzzleDone: PropTypes.func
};

Playfield.defaultProps = {
  playfield: null,
  width: 6,
  height: 6,
  onPuzzleDone: (successful) => { console.log(successful ? 'Won' : 'Lost')}
};

export default Playfield;