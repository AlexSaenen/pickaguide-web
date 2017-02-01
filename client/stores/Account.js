import alt from 'client/alt';
import AccountActions from 'actions/Account.js';
import AccountApi from 'services/Account.js';


class AccountStore {

  constructor() {
    this.error = null;
    this.account = null;
    this.bindActions(AccountActions);
  }

  _handleError(error) {
    this.error = error;
    this.account = '';
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

  onSettings(form) {
    AccountApi.settings(form);
  }

  onSettingsSuccess(account) {
    this.error = null;
    this.account = account;
  }

  onSettingsError(error) {
    this.error = error;
  }

  onInvalidateAccount() {
    this.account = null;
  }

  onSettingsValidationError(error) {
    this._handleError(error);
  }
}

export default alt.createStore(AccountStore, 'AccountStore');
