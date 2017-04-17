import alt from 'client/alt';
import SearchActions from 'actions/Search.js';
import SearchApi from 'services/Search.js';


class SearchStore {

  constructor() {
    this.error = null;
    this.results = [];
    this.bindActions(SearchActions);
  }

  onSearch(form) {
    SearchApi.search(form);
    return false;
  }

  onSearchSuccess(res) {
    this.error = null;
    this.results = res;
  }

  onError(error) {
    this.error = error;
    this.results = [];
  }
}

export default alt.createStore(SearchStore, 'SearchStore');
