import alt from 'client/alt';
import ProfileActions from 'actions/SearchProfile.js';
import ProfileApi from 'services/Profile.js';


class SearchProfileStore {

  constructor() {
    this.error = null;
    this.results = null;
    this.specificResult = null;
    this.bindActions(ProfileActions);
  }

  onSearch() {
    ProfileApi.search();
    return false;
  }

  onSearchSuccess(results) {
    this.error = null;
    this.results = results;
  }

  onGet(userId) {
    ProfileApi.get(userId);
    return false;
  }

  onGetSuccess(profile) {
    this.error = null;
    this.specificResult = profile;
  }

  onError(error) {
    this.error = error;
  }
}

export default alt.createStore(SearchProfileStore, 'SearchProfileStore');
