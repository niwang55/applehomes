import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

import axios from 'axios';

import Landing from './components/Landing.jsx';
import Navbar from './components/Navbar.jsx';

ReactDOM.render((
  <Router history={ browserHistory }>
    <Route path="/" component={ Navbar } />
  </Router>
), document.getElementById('app'));