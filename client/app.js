import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, useRouterHistory } from 'react-router';
import { createHashHistory } from 'history';
import { HomePage } from './components/HomePage.jsx';
import { SignIn } from './components/menu/SignIn.jsx';
import { LogIn } from './components/menu/LogIn.jsx';
import { Profile } from './components/menu/Profile.jsx';
import { Settings } from './components/menu/Settings.jsx';
import { ContactUs } from './components/menu/ContactUs.jsx';

import 'scss/global.scss';

const appHistory = useRouterHistory(createHashHistory)({ queryKey: false });

ReactDOM.render(
  <Router history={appHistory}>
    <Route path="/" component={HomePage}>
      <IndexRoute component={HomePage} />
    </Route>
    <Route path="signin" component={SignIn} />
    <Route path="login" component={LogIn} />
    <Route path="profile" component={Profile} />
    <Route path="settings" component={Settings} />
    <Route path="contactus" component={ContactUs} />
  </Router>
  , document.getElementById('app')
);
