import React, {PropTypes, Component} from 'react';
import KeyCode from 'keycode-js';
import Piece from './Piece';

import GAME_STATE from '../enums/GameState';
import PieceTypes from '../enums/PieceTypes';

import '../styles/components/Playfield.scss';

const {KEY_UP, KEY_DOWN, KEY_LEFT, KEY_RIGHT, KEY_RETURN} = KeyCode;

const animationDelay = 50;

class Playfield extends Component {

  constructor (props) {
    super(props);

    this.startGame = this.startGame.bind(this);
    this.updatePieceState = this.updatePieceState.bind(this);
    this.handlePieceTapped = this.handlePieceTapped.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.moveCursor = this.moveCursor.bind(this);
    this.lockControls = this.lockControls.bind(this);
    this.unlockControls = this.unlockControls.bind(this);
    this.updateCursorPosition = this.updateCursorPosition.bind(this);
    this.getValidDirections = this.getValidDirections.bind(this);
    this.hasValidMove = this.hasValidMove.bind(this);
    this.isPuzzleCompleted = this.isPuzzleCompleted.bind(this);
    this.puzzleDone = this.puzzleDone.bind(this);
    this.doMoveAction = this.doMoveAction.bind(this);
    this.restartGame = this.restartGame.bind(this);

    this._playfieldElement = null;

    document.addEventListener('keydown', this.handleKeyDown);

    this.state = {
      pieceDimensions: [0, 0],
      cursorPosition: [0, 0],
      gameState: GAME_STATE.UNSTARTED,
      playfield: JSON.parse(JSON.stringify(props.playfield)) || new Array(props.height).fill(new Array(props.width).fill(PieceTypes.Free))
    };
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.editMode && !this.props.editMode) {
      this.restartGame();
    }
  }

  componentDidMount () {
    if (this._playfieldElement) {
      let clientWidth = this._playfieldElement.clientWidth;
      this.setState({
        pieceDimensions: [
          clientWidth / this.props.width,
          clientWidth / this.props.height
        ]
      });      
    }

  }

  componentDidUpdate (prevProps, prevState) {
  }

  componentWillUnmount () {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  restartGame () {
    let playfield = this.state.playfield
      .map((row) => row
        .map((piece) => piece !== PieceTypes.Used ? piece : PieceTypes.Free));

    this.setState({
      playfield,
      gameState: GAME_STATE.UNSTARTED
    });
  }

  handlePieceTapped (position) {
    let {playfield, gameState, cursorPosition} = this.state;
    let [row, column] = position;

    if (this.props.editMode) {
      this.updatePieceState(position, 
        (playfield[row][column] !== PieceTypes.Free) ? PieceTypes.Free : PieceTypes.Block);

    } else if (gameState === GAME_STATE.UNSTARTED) {

      if (cursorPosition.every((v, i) => v === position[i])) {
        this.startGame();
        this.updatePieceState(position, PieceTypes.Used);

      } else if (playfield[row][column] === PieceTypes.Free) {
        this.updateCursorPosition(position);

      }
    }
  }

  handleKeyDown (e) {
    let {gameState} = this.state;

    if (gameState === GAME_STATE.UNSTARTED) this.moveCursor(e.keyCode);
    if (gameState === GAME_STATE.STARTED) this.doMoveAction(e.keyCode);
  }

  moveCursor (direction) {
    let {gameState, cursorPosition, playfield} = this.state;

    switch (direction) {
      case KEY_UP: {
        if (cursorPosition[0] > 0) this.updateCursorPosition([cursorPosition[0] - 1, cursorPosition[1]]);
        break;
      }

      case KEY_DOWN: {
        if (cursorPosition[0] < playfield.length - 1) this.updateCursorPosition([cursorPosition[0] + 1, cursorPosition[1]]);
        break;
      }

      case KEY_LEFT: {
        if (cursorPosition[1] > 0) this.updateCursorPosition([cursorPosition[0], cursorPosition[1] - 1]);
        break;
      }

      case KEY_RIGHT: {
        if (cursorPosition[1] < playfield[0].length - 1) this.updateCursorPosition([cursorPosition[0], cursorPosition[1] + 1]);
        break;
      }

      case KEY_RETURN: {
        let [row, column] = cursorPosition;

        if (this.props.editMode) {
          this.updatePieceState(cursorPosition, 
            (playfield[row][column] !== PieceTypes.Free) ? PieceTypes.Free : PieceTypes.Block);
        } else {
          if ((gameState === GAME_STATE.UNSTARTED) && (playfield[row][column] === PieceTypes.Free)) {
            this.updatePieceState(cursorPosition, PieceTypes.Used);
            this.startGame();
          }
        }

        break;
      }
    }
  }

  doMoveAction (direction) {
    let {gameState, cursorPosition} = this.state;
    let validMoves = this.getValidDirections(cursorPosition);

    if (![GAME_STATE.STARTED, GAME_STATE.MOVING].includes(gameState)) return;

    switch (direction) {
      case 'left':
      case KEY_LEFT: {
        if (validMoves.left) {
          let nextCursorPosition = [
            cursorPosition[0], 
            cursorPosition[1] - 1
          ];
          this.lockControls();
          this.updatePieceState(nextCursorPosition, PieceTypes.Used);
          this.updateCursorPosition(nextCursorPosition);
          window.setTimeout(() => this.doMoveAction(direction), animationDelay);
          return;
        }
        break;
      }

      case 'right':
      case KEY_RIGHT: {
        if (validMoves.right) {
          let nextCursorPosition = [
            cursorPosition[0], 
            cursorPosition[1] + 1
          ];
          this.lockControls();
          this.updatePieceState(nextCursorPosition, PieceTypes.Used);
          this.updateCursorPosition(nextCursorPosition);
          window.setTimeout(() => this.doMoveAction(direction), animationDelay);
          return;
        }
        break;
      }

      case 'up':
      case KEY_UP: {
        if (validMoves.up) {
          let nextCursorPosition = [
            cursorPosition[0] - 1, 
            cursorPosition[1]
          ];
          this.lockControls();
          this.updatePieceState(nextCursorPosition, PieceTypes.Used);
          this.updateCursorPosition(nextCursorPosition);
          window.setTimeout(() => this.doMoveAction(direction), animationDelay);
          return;
        }
        break;
      }

      case 'down':
      case KEY_DOWN: {
        if (validMoves.down) {
          let nextCursorPosition = [
            cursorPosition[0] + 1, 
            cursorPosition[1]
          ];
          this.lockControls();
          this.updatePieceState(nextCursorPosition, PieceTypes.Used);
          this.updateCursorPosition(nextCursorPosition);
          window.setTimeout(() => this.doMoveAction(direction), animationDelay);
          return;
        }
        break;
      }
    }

    this.unlockControls();

    let puzzleCompleted = this.isPuzzleCompleted();
    let hasValidMove = this.hasValidMove();

    if (puzzleCompleted || !hasValidMove) {
      this.puzzleDone(puzzleCompleted);
    }
  }

  puzzleDone (didWin) {
    let gameState = didWin ? GAME_STATE.WIN : GAME_STATE.LOSS;
    this.setState({gameState});
    this.props.onPuzzleDone(didWin);
  }

  updateCursorPosition(position) {
    this.setState({ cursorPosition: position });
  }

  lockControls () {
    if (this.state.gameState === GAME_STATE.STARTED) this.setState({gameState: GAME_STATE.MOVING});
  }

  unlockControls () {
    if (this.state.gameState === GAME_STATE.MOVING) this.setState({gameState: GAME_STATE.STARTED});
  }

  startGame () {
    if (this.state.gameState === GAME_STATE.UNSTARTED) this.setState({gameState: GAME_STATE.STARTED});
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
    let {gameState} = this.state;
    let started = gameState !== GAME_STATE.UNSTARTED;

    return (
      <div className={`playfield ${gameState.toLowerCase()}`}
        ref={(e) => this._playfieldElement = e}>
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
    let {playfield, cursorPosition, gameState, editMode, pieceDimensions} = this.state;
    let pieces = [];

    for (let column = 0; column < width; column++) {
      pieces.push(
        <Piece key={`${row},${column}`} 
          position={[row, column]} 
          pieceState={playfield[row][column]}
          pieceActive={[row, column].every((v, i) => v === cursorPosition[i])}
          playfield={playfield}
          getValidDirections={this.getValidDirections}
          gameState={gameState}
          editMode={editMode}
          rows={height}
          columns={width}
          pieceDimensions={pieceDimensions}
          pieceTapped={this.handlePieceTapped}
          directionTapped={this.doMoveAction} />
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
