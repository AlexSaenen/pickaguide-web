import { browserHistory } from 'react-router';

import alt from 'client/alt';
import AuthActions from 'actions/Auth.js';
import AuthApi from 'services/Auth.js';
import CookieApi from 'services/Cookie.js';


class AuthStore {

  constructor() {
    this.error = null;
    this.credentials = {
      token: CookieApi.get('userToken'),
      id: CookieApi.get('userId'),
    };

    this.bindActions(AuthActions);
  }

  onLogin(form) {
    AuthApi.login(form);
    return false;
  }

  onLoginSuccess(credentials) {
    this.error = null;
    this.credentials = credentials;
    browserHistory.push('/');
  }

  onLoginError(error) {
    this.error = error;
  }

  onLogout() {
    AuthApi.logout();
    return false;
  }

  onLogoutSuccess() {
    this.error = null;
    this.credentials = null;
    browserHistory.push('/');
  }

  onLogoutError(error) {
    this.error = error;
  }
}

export default alt.createStore(AuthStore, 'AuthStore');
