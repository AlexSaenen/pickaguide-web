import alt from 'client/alt';
import SearchActions from 'actions/Search.js';
import SearchApi from 'services/Search.js';


class SearchStore {

  constructor() {
    this.error = null;
    this.resultSearch = null;
    this.bindActions(SearchActions);
  }

  onSearch(form) {
    SearchApi.search(form);
    return false;
  }

  onSearchSuccess(res) {
    this.error = null;
    this.resultSearch = res;
    this.resultSearch = {profil:[{name:"toto"}, {name:"titi"}],
                         advert:[{city:"paris"}, {city:"madrid"}]};
  }

  onSearchError(error) {
    this.error = error;
    this.resultSearch = null;
  }
}

export default alt.createStore(SearchStore, 'SearchStore');
