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
import Login from './components/Login.jsx';
import UserOptions from './components/UserOptions.jsx';
import NewHome from './components/NewHome.jsx';
import EditHomes from './components/EditHomes.jsx';

function requireAuth(nextState, replace, callback) {
  axios.get('/api/authenticate')
    .then(response => {
      if (!response.data.authenticated) {
        replace('/login');
      }
      callback();
    })
    .catch(error => {
      callback();
    });
}

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
      <Route path="/login" component={ Login } />
      <Route path="/useroptions" component={ UserOptions } onEnter={ requireAuth } />
      <Route path="/newhome" component={ NewHome } onEnter={ requireAuth } />
      <Route path="/edithomes" component={ EditHomes } onEnter={ requireAuth } />
    </Route>
  </Router>
), document.getElementById('app'));