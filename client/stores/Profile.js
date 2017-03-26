import alt from 'client/alt';
import ProfileActions from 'actions/Profile.js';
import ProfileApi from 'services/Profile.js';


class ProfileStore {

  constructor() {
    this.error = null;
    this.profile = null;
    this.isGuide = false;
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

  onIsGuide(userId) {
    ProfileApi.isGuide(userId);
    return false;
  }

  becomeGuide(formBecomeGuide) {
    ProfileApi.becomeGuide(formBecomeGuide);
    return false;
  }

  onIsGuideSuccess(isGuide) {
    this.isGuide = isGuide;
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
  }

  onInvalidateProfile() {
    this.profile = null;
    this.isGuide = false;
  }
}

export default alt.createStore(ProfileStore, 'ProfileStore');
