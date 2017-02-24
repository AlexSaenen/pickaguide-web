import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import { MainLayout } from 'components/MainLayout.jsx';
import Home from 'components/views/Home.jsx';
import { Signup } from 'components/views/Signup.jsx';
import { Login } from 'components/views/Login.jsx';
import { Profile } from 'components/views/Profile.jsx';
import { Settings } from 'components/views/Settings.jsx';
import { EditAccount } from 'components/views/EditAccount.jsx';
import { EditProfile } from 'components/views/EditProfile.jsx';
import { Contact } from 'components/views/Contact.jsx';
import About from 'components/views/About.jsx';
import 'services/Utils.js';

import 'scss/global.scss';

ReactDOM.render(

  <Router history={browserHistory}>
    <Route path="/" component={MainLayout}>
      <IndexRoute component={Home} />
      <Route path="signup" component={Signup} />
      <Route path="login" component={Login} />
      <Route path="settings/edit" component={Settings} />
      <Route path="profile" component={Profile} />
      <Route path="profile/edit" component={EditProfile} />
      <Route path="account/edit" component={EditAccount} />
      <Route path="contact-us" component={Contact} />
      <Route path="about" component={About} />
    </Route>
  </Router>

  , document.getElementById('app')
);
