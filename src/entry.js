import React from 'react';
import ReactDOM from 'react-dom';
import Game from './components/Game';

import './styles/document.scss';

let entryPoint = document.getElementById('root');

document.body.classList.remove('uninitialized');

ReactDOM.render(<Game />, entryPoint);