import alt from '../alt';

import ProfileActions from '../actions/Profile.js';
import ProfileApi from '../services/Profile.js';

class ProfileStore {
  constructor() {
    this.error = null;
    this.profile = null;
    this.bindActions(ProfileActions);
  }

  onGet() {
    ProfileApi.get();
  }

  onGetSuccess(profile) {
    this.error = null;
    this.profile = profile;
  }

  onGetError(error) {
    this.error = error;
    this.profile = null;
  }

  onInvalidateProfile() {
    this.profile = null;
  }
}

export default alt.createStore(ProfileStore, 'ProfileStore');
