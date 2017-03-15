import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import { MainLayout } from 'main/MainLayout.jsx';
import Home from 'views/Home.jsx';
import { Signup } from 'views/Signup.jsx';
import { Login } from 'views/Login.jsx';
import { Profile } from 'views/Profile.jsx';
import { Settings } from 'views/Settings.jsx';
import { EditAccount } from 'views/EditAccount.jsx';
import { EditProfile } from 'views/EditProfile.jsx';
import { Adverts } from 'views/Adverts.jsx';
import { Contact } from 'views/Contact.jsx';
import About from 'views/About.jsx';
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
      <Route path="profile/adverts" component={Adverts} />
    </Route>
  </Router>

  , document.getElementById('app')
);
