import alt from 'client/alt';
import ProfileActions from 'actions/SearchProfile.js';
import AvatarActions from 'actions/SearchAvatar.js';
import SearchApi from 'services/Search.js';


class SearchProfileStore {

  constructor() {
    this.error = null;
    this.profile = null;
    this.id = null;
    this.bindActions(ProfileActions);
  }

  onGet(id) {
    SearchApi.findProfile(id);
    this.id = id;
    return false;
  }

  onGetSuccess(profile) {
    this.error = null;
    this.profile = profile;

    if (profile.hasAvatar) {
      AvatarActions.get.defer(this.id);
    }
  }

  onError(error) {
    this.error = error;
  }
}

export default alt.createStore(SearchProfileStore, 'SearchProfileStore');
