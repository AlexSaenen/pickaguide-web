import alt from 'client/alt';
import AccountActions from 'actions/Account.js';
import AccountApi from 'services/Account.js';


class AccountStore {

  constructor() {
    this.error = null;
    this.mailError = null;
    this.passwordError = null;
    this.mailSuccess = null;
    this.passwordSuccess = null;
    this.account = null;
    this.bindActions(AccountActions);
  }

  onGet() {
    AccountApi.get();
    return false;
  }

  onGetSuccess(account) {
    this.error = null;
    this.mailError = null;
    this.passwordError = null;
    this.mailSuccess = null;
    this.passwordSuccess = null;
    this.account = account;
  }

  onError(error) {
    this.error = error;
    this.mailError = null;
    this.passwordError = null;
    this.mailSuccess = null;
    this.passwordSuccess = null;
    this.account = null;
  }

  onUpdate(form) {
    AccountApi.update(form);
    return false;
  }

  onUpdateSuccess(user) {
    this.error = null;
    this.mailError = null;
    this.passwordError = null;
    this.mailSuccess = null;
    this.passwordSuccess = null;
    this.account = user.account;
  }

  onUpdateMail(form) {
    AccountApi.updateMail(form);
    return false;
  }

  onUpdateMailSuccess(user) {
    this.error = null;
    this.passwordError = null;
    this.passwordSuccess = null;
    this.mailError = null;
    this.mailSuccess = 'You will receive a confirmation mail at your new address';
    this.account = user.account;
  }

  onUpdateMailError(error) {
    this.passwordError = null;
    this.passwordSuccess = null;
    this.error = null;
    this.mailError = error;
    this.mailSuccess = null;
  }

  onUpdatePassword(form) {
    AccountApi.updatePassword(form);
    return false;
  }

  onUpdatePasswordSuccess(user) {
    this.mailError = null;
    this.mailSuccess = null;
    this.error = null;
    this.passwordError = null;
    this.passwordSuccess = 'Your password has been updated';
    this.account = user.account;
  }

  onUpdatePasswordError(error) {
    this.mailError = null;
    this.mailSuccess = null;
    this.error = null;
    this.passwordError = error;
    this.passwordSuccess = null;
  }

  onInvalidateAccount() {
    this.account = null;
  }
}

export default alt.createStore(AccountStore, 'AccountStore');
