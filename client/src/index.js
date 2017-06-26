import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import axios from 'axios';

import Navbar from './components/Navbar.jsx';
import About from './components/About.jsx';
import Homes from './components/Homes.jsx';
import Areas from './components/Areas.jsx';
import Gallery from './components/Gallery.jsx';
import FindUs from './components/FindUs.jsx';

ReactDOM.render((
  <Router history={ browserHistory }>
    <Route path="/" component={ Navbar }>
      <IndexRoute component={ About } />
      <Route path="/about" component={ About } />
      <Route path="/homes" component={ Homes } />
      <Route path="/areas" component={ Areas } />
      <Route path="/gallery" component={ Gallery } />
      <Route path="/findus" component={ FindUs } />
    </Route>
  </Router>
), document.getElementById('app'));