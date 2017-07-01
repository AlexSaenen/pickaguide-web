import alt from 'client/alt';
import UserActions from 'actions/SearchUser.js';
import UserApi from 'services/User.js';


class UserStore {

  constructor() {
    this.error = null;
    this.isGuide = false;
    this.bindActions(UserActions);
  }

  onIsGuide(userId) {
    UserApi.isHeGuide(userId);
    return false;
  }

  onIsGuideSuccess(isGuide) {
    this.isGuide = isGuide;
    this.error = null;
  }

}

export default alt.createStore(UserStore, 'SearchUserStore');
