import alt from '../alt';

import SignupActions from '../actions/Signup.js';
import SignupApi from '../services/Signup.js';

class SignupStore {
  constructor() {
    this.error = '';
    this.message = '';
    this.bindActions(SignupActions);
  }

  _handleError(error) {
    this.error = error;
    this.message = '';
  }

  onRequestSignup(form) {
    SignupApi.getSignup(form);
  }

  onRequestSignupSuccess(result) {
    this.error = null;
    this.message = result;
  }

  onRequestSignupError(error) {
    this._handleError(error);
  }

  onSignupValidationError(error) {
    this._handleError(error);
  }
}

export default alt.createStore(SignupStore, 'SignupStore');
