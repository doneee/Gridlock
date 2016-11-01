import React from 'react';
import ReactDOM from 'react-dom';
import Main from './components/Main';

import './styles/document.scss';

let entryPoint = document.getElementById('root');

document.body.classList.remove('uninitialized');

ReactDOM.render(<Main />, entryPoint);