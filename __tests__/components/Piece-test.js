// Link.react-test.js
import React from 'react';
import renderer from 'react-test-renderer';

import Piece from '../../src/components/Piece';
import PieceTypes from '../../src/enums/PieceTypes';
import GAME_STATE from '../../src/enums/GameState';

describe('<Piece />', () => {
  it('renders with default props', () => {
    const component = renderer.create(
      <Piece />
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders with active state', () => {
    const component = renderer.create(
      <Piece pieceActive={true} />
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })

  it('renders with used state', () => {
    const component = renderer.create(
      <Piece pieceState={PieceTypes.Used} />
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders direction buttons when active and game is started', () => {
    const component = renderer.create(
      <Piece pieceActive={true} gameState={GAME_STATE.STARTED} />
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
