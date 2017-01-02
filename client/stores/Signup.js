import alt from '../alt';

import SignupActions from '../actions/Signup.js';
import SignupApi from '../services/Signup.js';

class SignupStore {
  constructor() {
    this.error = '';
    this.message = '';
    this.code = 0;
    this.bindActions(SignupActions);
  }

  onRequestSignup(form) {
    SignupApi.getSignup(form);
  }

  onRequestSignupSuccess(result) {
    this.error = null;
    this.message = result;
    this.code = 200;
  }

  onRequestSignupError(error) {
    this.error = error;
    this.message = '';
    this.code = 400;
  }
}

export default alt.createStore(SignupStore, 'SignupStore');
