import alt from 'client/alt';
import AvatarActions from 'actions/Avatar.js';
import ProfileApi from 'services/Profile.js';

const defaultAvatarUrl = 'https://www.learnmine.com/assets/img/medium-default-avatar.png';

class AvatarStore {

  constructor() {
    this.error = null;
    this.avatar = defaultAvatarUrl;
    this.isLoaded = false;
    this.bindActions(AvatarActions);
  }

  onGet() {
    this.isLoaded = false;
    ProfileApi.getAvatar();
    return false;
  }

  onGetSuccess(avatar) {
    this.error = null;
    this.isLoaded = true;
    this.avatar = avatar;
  }

  onUpdate(form) {
    ProfileApi.updateAvatar(form);
    return false;
  }

  onError(error) {
    this.error = error;
  }

  onInvalidateAvatar() {
    this.avatar = defaultAvatarUrl;
    this.isLoaded = false;
    this.error = null;
  }

}

export default alt.createStore(AvatarStore, 'AvatarStore');
