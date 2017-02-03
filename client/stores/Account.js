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
  }

  onGetSuccess(account) {
    this.error = null;
    this.account = account;
  }

  onError(error) {
    this.error = error;
    this.account = null;
  }

  onUpdate(form) {
    AccountApi.update(form);
  }

  onUpdateSuccess(user) {
    this.error = null;
    this.account = user.account;
  }

  onInvalidateAccount() {
    this.account = null;
  }
}

export default alt.createStore(AccountStore, 'AccountStore');
