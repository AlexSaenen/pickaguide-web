import alt from 'client/alt';
import PasswordActions from 'actions/Password.js';
import AccountApi from 'services/Account.js';


class PasswordStore {

  constructor() {
    this.error = null;
    this.bindActions(PasswordActions);
  }

  onError(error) {
    this.error = error;
  }

  onUpdate(form) {
    if (form.password !== form.passwordConfirmation) {
      PasswordActions.error.defer('The passwords do not match');
    } else {
      if (form.currentPassword === form.password) {
        PasswordActions.error.defer('Your new password needs to be different');
      } else {
        AccountApi.updatePassword(form);
      }
    }

    return false;
  }

  onUpdateSuccess() {
    this.error = null;
  }
}

export default alt.createStore(PasswordStore, 'PasswordStore');
