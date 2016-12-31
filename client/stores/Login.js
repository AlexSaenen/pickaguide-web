import alt from '../alt';

import LoginActions from '../actions/Login.js';
import LoginApi from '../services/Login.js';

class LoginStore {
  constructor() {
    this.error = '';
    this.login = null;
    this.bindActions(LoginActions);
  }

  onRequestLogin(form) {
    LoginApi.getLogin(form);
  }

  onRequestLoginSuccess(login) {
    this.error = null;
    this.login = login;
  }

  onRequestLoginError(error) {
    this.error = error;
  }
}

export default alt.createStore(LoginStore, 'LoginStore');
