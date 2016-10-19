import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'
import { HomePage } from './components/HomePage.jsx';
import { SignIn } from './components/menu/SignIn.jsx';
import { LogIn } from './components/menu/LogIn.jsx';

import 'scss/global.scss';

ReactDOM.render(

  <Router history={hashHistory}>
    <Route path="/" component={HomePage}>
      <IndexRoute component={HomePage} />
    </Route>
    <Route path="signin" component={SignIn} />
    <Route path="login" component={LogIn} />
  </Router>

  , document.getElementById('app')
);
