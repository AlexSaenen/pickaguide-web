import alt from 'client/alt';
import AvatarActions from 'actions/Avatar.js';
import AvatarApi from 'services/Avatar.js';
import AuthStore from 'stores/user/Auth.js';


class AvatarStore {

  constructor() {
    this.error = null;
    this.avatar = '';
    this.isLoaded = false;
    this.bindActions(AvatarActions);
  }

  onGet(hasAvatar) {
    this.isLoaded = false;
    AvatarApi.getAvatar(AuthStore.getState().credentials.id, AvatarActions, hasAvatar, true);
    return false;
  }

  onGetSuccess(avatarObj) {
    this.error = null;
    this.isLoaded = true;
    this.avatar = avatarObj.avatar;
  }

  onUpdate(form) {
    AvatarApi.updateAvatar(form);
    return false;
  }

  onRemove() {
    AvatarApi.remove();
    return false;
  }

  onError(error) {
    this.error = error;
  }

  onInvalidateAvatar() {
    this.avatar = '';
    this.isLoaded = false;
    this.error = null;
  }

}

export default alt.createStore(AvatarStore, 'AvatarStore');
