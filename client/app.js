import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import { MainLayout } from 'components/MainLayout.jsx';
import Home from 'components/views/Home.jsx';
import { Signup } from 'components/views/Signup.jsx';
import { Login } from 'components/views/Login.jsx';
// import { Profile } from 'components/views/Profile.jsx';
import { Settings } from 'components/views/Settings.jsx';
import { SettingsAccount } from 'components/views/SettingsAccount.jsx';
import { SettingsProfile } from 'components/views/SettingsProfile.jsx';
import { Contact } from 'components/views/Contact.jsx';
import About from 'components/views/About.jsx';
import 'services/Utils.js';

import 'scss/global.scss';

// <Route path="profile" component={Profile} />
ReactDOM.render(

  <Router history={browserHistory}>
    <Route path="/" component={MainLayout}>
      <IndexRoute component={Home} />
      <Route path="signup" component={Signup} />
      <Route path="login" component={Login} />
      <Route path="settings" component={Settings} />
      <Route path="account" component={SettingsAccount} />
      <Route path="profile" component={SettingsProfile} />
      <Route path="contact-us" component={Contact} />
      <Route path="about" component={About} />
    </Route>
  </Router>

  , document.getElementById('app')
);
