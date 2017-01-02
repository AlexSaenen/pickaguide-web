import alt from '../alt';

import LoginActions from '../actions/Login.js';
import LoginApi from '../services/Login.js';

class LoginStore {
  constructor() {
    this.error = '';
    this.login = null;
    this.code = 0;
    this.bindActions(LoginActions);
  }

  onRequestLogin(form) {
    LoginApi.getLogin(form);
  }

  onRequestLoginSuccess(login) {
    this.error = null;
    this.login = login;
    this.code = 200;
  }

  onRequestLoginError(error) {
    this.error = error;
    this.code = 400;
  }
}

export default alt.createStore(LoginStore, 'LoginStore');
