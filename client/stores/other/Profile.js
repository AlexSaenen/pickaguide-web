import alt from 'client/alt';
import ProfileActions from 'actions/SearchProfile.js';
import SearchApi from 'services/Search.js';


class SearchProfileStore {

  constructor() {
    this.error = null;
    this.profile = null;
    this.bindActions(ProfileActions);
  }

  onGet(id) {
    SearchApi.findProfile(id);
    return false;
  }

  onGetSuccess(profile) {
    this.error = null;
    this.profile = profile;
  }

  onError(error) {
    this.error = error;
  }
}

export default alt.createStore(SearchProfileStore, 'SearchProfileStore');
