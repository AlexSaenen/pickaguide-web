import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import { MainLayout } from 'main/MainLayout.jsx';
import Home from 'views/Home.jsx';
import { Signup } from 'views/Signup.jsx';
import { Login } from 'views/Login.jsx';
import { Profile } from 'views/Profile.jsx';
import { OwnerProfile } from 'views/OwnerProfile.jsx';
import { EditAccount } from 'views/EditAccount.jsx';
import { EditProfile } from 'views/EditProfile.jsx';
import { Contact } from 'views/Contact.jsx';
import { Search } from 'views/Search.jsx';
import { Become } from 'views/guide/Become.jsx';
import { Adverts } from 'views/guide/Adverts.jsx';
import { OwnerAdvert } from 'views/guide/OwnerAdvert.jsx';
import { Advert } from 'views/guide/Advert.jsx';
import About from 'views/About.jsx';

import 'services/Utils.js';

import 'scss/global.scss';


ReactDOM.render(

  <Router history={browserHistory}>
    <Route path="/" component={MainLayout}>
      <IndexRoute component={Home} />
      <Route path="signup" component={Signup} />
      <Route path="login" component={Login} />
      <Route path="profiles/mine" component={OwnerProfile} />
      <Route path="profiles/:id" component={Profile} />
      <Route path="profiles/mine/edit" component={EditProfile} />
      <Route path="accounts/mine/edit" component={EditAccount} />
      <Route path="contact-us" component={Contact} />
      <Route path="about" component={About} />
      <Route path="search/:terms" component={Search} />
      <Route path="guide/become" component={Become} />
      <Route path="guide/adverts" component={Adverts} />
      <Route path="guide/adverts/:id" component={Advert} />
      <Route path="guide/adverts/mine/:id" component={OwnerAdvert} />
    </Route>
  </Router>

  , document.getElementById('app')
);
