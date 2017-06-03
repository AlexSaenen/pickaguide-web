import alt from 'client/alt';
import AvatarActions from 'actions/Avatar.js';
import ProfileApi from 'services/Profile.js';

const defaultAvatarUrl = 'https://www.learnmine.com/assets/img/medium-default-avatar.png';

class AvatarStore {

  constructor() {
    this.error = null;
    this.avatar = defaultAvatarUrl;
    this.bindActions(AvatarActions);
  }

  onGet() {
    ProfileApi.getAvatar();
    return false;
  }

  onGetSuccess(avatar) {
    this.error = null;
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
    this.error = null;
  }

}

export default alt.createStore(AvatarStore, 'AvatarStore');
