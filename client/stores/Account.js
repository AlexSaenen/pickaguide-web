import alt from '../alt';

import AccountActions from '../actions/Account.js';
import AccountApi from '../services/Account.js';

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

  onGetError(error) {
    this.error = error;
  }

  onInvalidateAccount() {
    this.account = null;
  }
}

export default alt.createStore(AccountStore, 'AccountStore');
