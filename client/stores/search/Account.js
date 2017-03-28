import alt from 'client/alt';
import AccountActions from 'actions/SearchAccount.js';
import AccountApi from 'services/Account.js';

import { browserHistory } from 'react-router';

class SearchAccountStore {

  constructor() {
    this.error = null;
    this.results = null;
    this.specificResult = null;
    this.bindActions(AccountActions);
  }

  onSearch() {
    AccountApi.search();
    return false;
  }

  onSearchSuccess(results) {
    this.error = null;
    this.results = results;
    browserHistory.push(`/profiles/${results[1].id}`);
  }

  onGet(userId) {
    AccountApi.get(userId);
    return false;
  }

  onGetSuccess(account) {
    this.error = null;
    this.specificResult = account;
  }

  onError(error) {
    this.error = error;
  }
}

export default alt.createStore(SearchAccountStore, 'SearchAccountStore');
