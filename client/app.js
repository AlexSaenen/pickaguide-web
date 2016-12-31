import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { HomePage } from './components/HomePage.jsx';
import { Signup } from './components/forms/Signup.jsx';
import { Login } from './components/forms/Login.jsx';
import { Profile } from './components/forms/Profile.jsx';
import { Settings } from './components/forms/Settings.jsx';
import { ContactUs } from './components/forms/ContactUs.jsx';

import 'scss/global.scss';

ReactDOM.render(

  <Router history={browserHistory}>
    <Route path="/" component={HomePage}>
      <IndexRoute component={HomePage} />
    </Route>
    <Route path="signup" component={Signup} />
    <Route path="login" component={Login} />
    <Route path="profile" component={Profile} />
    <Route path="settings" component={Settings} />
    <Route path="contactus" component={ContactUs} />
  </Router>

  , document.getElementById('app')
);
