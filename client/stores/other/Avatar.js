import alt from 'client/alt';
import AvatarActions from 'actions/SearchAvatar.js';
import SearchApi from 'services/Search.js';

const defaultAvatarUrl = 'https://www.learnmine.com/assets/img/medium-default-avatar.png';

class SearchAvatarStore {

  constructor() {
    this.error = null;
    this.avatar = defaultAvatarUrl;
    this.bindActions(AvatarActions);
  }

  onGet(id) {
    SearchApi.getAvatar(id);
    return false;
  }

  onGetSuccess(avatar) {
    this.error = null;
    this.avatar = avatar;
  }

  onError(error) {
    this.error = error;
  }
}

export default alt.createStore(SearchAvatarStore, 'SearchAvatarStore');
