import alt from 'client/alt';
import ProfileActions from 'actions/Profile.js';
import ProfileApi from 'services/Profile.js';


class ProfileStore {

  constructor() {
    this.error = null;
    this.profile = null;
    this.bindActions(ProfileActions);
  }

  onGet() {
    ProfileApi.get();
    return false;
  }

  onGetSuccess(profile) {
    this.error = null;
    this.profile = profile;
  }

  onError(error) {
    this.error = error;
  }

  onUpdate(form) {
    ProfileApi.update(form);
    return false;
  }

  onUpdateSuccess(user) {
    this.error = null;
    this.profile = user.profile;
  }

  onInvalidateProfile() {
    this.profile = null;
    this.error = null;
  }

}

export default alt.createStore(ProfileStore, 'ProfileStore');
