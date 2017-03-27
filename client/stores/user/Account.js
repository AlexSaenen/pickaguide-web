import alt from 'client/alt';
import AccountActions from 'actions/Account.js';
import AccountApi from 'services/Account.js';


class AccountStore {

  constructor() {
    this.error = null;
    this.account = null;
    this.isConfirmed = false;
    this.bindActions(AccountActions);
  }

  onGet() {
    AccountApi.get();
    return false;
  }

  onGetSuccess(account) {
    this.error = null;
    this.account = account;
  }

  onIsConfirmed(userId) {
    AccountApi.isConfirmed(userId);
    return false;
  }

  onIsConfirmedSuccess(isConfirmed) {
    this.isConfirmed = isConfirmed;
  }

  onError(error) {
    this.error = error;
  }

  onUpdate(form) {
    AccountApi.update(form);
    return false;
  }

  onUpdateSuccess(user) {
    this.error = null;
    this.account = user.account;
  }

  onUpdateMail(form) {
    AccountApi.updateMail(form);
    return false;
  }

  onInvalidateAccount() {
    this.account = null;
    this.isConfirmed = false;
  }
}

export default alt.createStore(AccountStore, 'AccountStore');
