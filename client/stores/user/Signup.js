import { browserHistory } from 'react-router';

import alt from 'client/alt';
import SignupActions from 'actions/Signup.js';
import SignupApi from 'services/Signup.js';


class SignupStore {

  constructor() {
    this.error = null;
    this.message = '';
    this.bindActions(SignupActions);
  }

  onSignup(form) {
    if (form.password !== form.passwordConfirmation) {
      SignupActions.error.defer('The passwords do not match');
    } else {
      delete form.passwordConfirmation;
      SignupApi.signup(form);
    }

    return false;
  }

  onSignupSuccess(message) {
    this.error = null;
    this.message = message;
    browserHistory.push('/login');
  }

  onError(error) {
    this.error = error;
    this.message = '';
  }
}

export default alt.createStore(SignupStore, 'SignupStore');
