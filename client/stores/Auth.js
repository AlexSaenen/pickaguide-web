import alt from '../alt';

import AuthActions from '../actions/Auth.js';
import AuthApi from '../services/Auth.js';

class AuthStore {
  constructor() {
    this.error = null;
    this.token = null;
    this.bindActions(AuthActions);
  }

  onLogin(form) {
    AuthApi.login(form);
  }

  onLoginSuccess(token) {
    this.error = null;
    this.token = token;
  }

  onLoginError(error) {
    this.error = error;
  }

  onLogout() {
    AuthApi.logout();
  }

  onLogoutSuccess() {
    this.error = null;
    this.token = null;
  }

  onLogoutError(error) {
    this.error = error;
  }
}

export default alt.createStore(AuthStore, 'AuthStore');
