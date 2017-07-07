import alt from 'client/alt';
import AvatarActions from 'actions/SearchAvatar.js';
import SearchApi from 'services/Search.js';

const defaultAvatarUrl = 'https://www.learnmine.com/assets/img/medium-default-avatar.png';

class SearchAvatarStore {

  constructor() {
    this.error = null;
    this.avatar = defaultAvatarUrl;
    this.bindActions(AvatarActions);
    this.id = null;
  }

  onGet(id) {
    SearchApi.getAvatar(id);
    return false;
  }

  onGetSuccess(avatarObj) {
    this.error = null;
    this.avatar = avatarObj.avatar;
    this.id = avatarObj.userId;
  }

  onError(error) {
    this.error = error;
  }

  onInvalidate() {
    this.error = null;
    this.avatar = defaultAvatarUrl;
    this.id = null;
  }

}

export default alt.createStore(SearchAvatarStore, 'SearchAvatarStore');
