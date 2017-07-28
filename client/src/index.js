import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import axios from 'axios';

import Navbar from './components/Navbar.jsx';
import About from './components/About.jsx';
import Homes from './components/Homes.jsx';
import Areas from './components/Areas.jsx';
import FindUs from './components/FindUs.jsx';
import HomeDetail from './components/HomeDetail.jsx';
import AreaDetail from './components/AreaDetail.jsx';
import NewHome from './components/NewHome.jsx';

ReactDOM.render((
  <Router history={ browserHistory }>
    <Route path="/" component={ Navbar }>
      <IndexRoute component={ About } />
      <Route path="/about" component={ About } />
      <Route path="/homes" component={ Homes } />
      <Route path="/areas" component={ Areas } />
      <Route path="/findus" component={ FindUs } />
      <Route path="/homedetail" component={ HomeDetail } />
      <Route path="/areadetail" component={ AreaDetail } />
    </Route>
  </Router>
), document.getElementById('app'));