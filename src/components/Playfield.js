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
    this.updateCursorPosition = this.updateCursorPosition.bind(this);

    document.addEventListener('keydown', this.handleKeyDown);

    this.state = {
      cursorPosition: [-1, -1],
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

  }

  updateCursorPosition(position) {
    this.setState({ cursorPosition: position });
  }

  startGame () {
    this.setState({ started: true });
  }

  updatePieceState ([row, column], state) {
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
  height: PropTypes.number
};

Playfield.defaultProps = {
  playfield: null,
  width: 6,
  height: 6
};

export default Playfield;