import { browserHistory } from 'react-router';

import alt from 'client/alt';
import AuthActions from 'actions/Auth.js';
import AuthApi from 'services/Auth.js';


class AuthStore {

  constructor() {
    this.error = null;
    this.token = AuthApi.getTokenFromCookie();
    this.bindActions(AuthActions);
  }

  onLogin(form) {
    AuthApi.login(form);
    return false;
  }

  onLoginSuccess(token) {
    this.error = null;
    this.token = token;
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
    this.token = null;
    browserHistory.push('/');
  }

  onLogoutError(error) {
    this.error = error;
  }
}

export default alt.createStore(AuthStore, 'AuthStore');
