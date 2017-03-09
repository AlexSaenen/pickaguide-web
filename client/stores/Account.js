import alt from 'client/alt';
import AccountActions from 'actions/Account.js';
import AccountApi from 'services/Account.js';


class AccountStore {

  constructor() {
    this.error = null;
    this.account = null;
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
  }
}

export default alt.createStore(AccountStore, 'AccountStore');
