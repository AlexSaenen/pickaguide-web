import alt from 'client/alt';
import SearchActions from 'actions/Search.js';
import SearchApi from 'services/Search.js';


class SearchStore {

  constructor() {
    this.error = null;
    this.resultSearch = {profil:[{name:"toto", age:24}, {name:"titi", age:40}],
                         advert:[{city:"paris", description:"visite de la tour eiffel"}, {city:"madrid", description:"visite de la ville"}]};
    // this.resultSearch = null;
    this.bindActions(SearchActions);
  }

  onSearch(form) {
    print("ICICICICICICICICICICICICICICCICICICICICCICICICI");
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
