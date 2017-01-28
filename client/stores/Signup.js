import alt from 'client/alt';
import SignupActions from 'actions/Signup.js';
import SignupApi from 'services/Signup.js';


class SignupStore {

  constructor() {
    this.error = null;
    this.message = '';
    this.bindActions(SignupActions);
  }

  _handleError(error) {
    this.error = error;
    this.message = '';
  }

  onSignup(form) {
    SignupApi.signup(form);
    return false;
  }

  onSignupSuccess(message) {
    this.error = null;
    this.message = message;
  }

  onSignupError(error) {
    this._handleError(error);
  }

  onSignupValidationError(error) {
    this._handleError(error);
  }
}

export default alt.createStore(SignupStore, 'SignupStore');
