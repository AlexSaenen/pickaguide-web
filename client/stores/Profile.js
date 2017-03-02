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
    this.profile.pseudo = `${profile.firstName} ${profile.lastName.charAt(0).toUpperCase()}`;
  }

  onError(error) {
    this.error = error;
    this.profile = null;
  }

  onUpdate(form) {
    ProfileApi.update(form);
    return false;
  }

  onUpdateSuccess(user) {
    this.error = null;
    this.profile = user.profile;
    this.profile.pseudo = `${user.profile.firstName} ${user.profile.lastName.charAt(0).toUpperCase()}`;
  }

  onInvalidateProfile() {
    this.profile = null;
  }
}

export default alt.createStore(ProfileStore, 'ProfileStore');
