import alt from 'client/alt';
import AccountActions from 'actions/SearchAccount.js';
import SearchApi from 'services/Search.js';


class SearchAccountStore {

  constructor() {
    this.error = null;
    this.account = null;
    this.isConfirmed = false;
    this.bindActions(AccountActions);
  }

  onGet(id) {
    SearchApi.getAccount(id);
    return false;
  }

  onGetSuccess(account) {
    this.error = null;
    this.account = account;
  }

  onError(error) {
    this.error = error;
  }

  onIsConfirmed(id) {
    SearchApi.isConfirmed(id);
    return false;
  }

  onIsConfirmedSuccess(isConfirmed) {
    this.isConfirmed = isConfirmed;
    this.error = null;
  }

}

export default alt.createStore(SearchAccountStore, 'SearchAccountStore');
