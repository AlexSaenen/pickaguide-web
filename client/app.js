import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import MainLayout from './components/MainLayout.jsx';
import Home from './components/views/Home.jsx';
import { Signup } from './components/views/Signup.jsx';
import { Login } from './components/views/Login.jsx';
import { Profile } from './components/views/Profile.jsx';
import { Settings } from './components/views/Settings.jsx';
import { ContactUs } from './components/views/ContactUs.jsx';

import 'scss/global.scss';

ReactDOM.render(

  <Router history={browserHistory}>
    <Route path="/" component={MainLayout}>
      <IndexRoute component={Home} />
      <Route path="signup" component={Signup} />
      <Route path="login" component={Login} />
      <Route path="profile" component={Profile} />
      <Route path="settings" component={Settings} />
      <Route path="contactus" component={ContactUs} />
    </Route>
  </Router>

  , document.getElementById('app')
);
