'use strict';
import 'babel-polyfill';
import 'whatwg-fetch';
import React from 'react';
import {render} from 'react-dom';
import App from './components/app';

render(<App />, document.querySelector('#app'));
