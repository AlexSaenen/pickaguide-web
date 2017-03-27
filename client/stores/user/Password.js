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
    AccountApi.updatePassword(form);
    return false;
  }

  onUpdateSuccess() {
    this.error = null;
  }
}

export default alt.createStore(PasswordStore, 'PasswordStore');
