import alt from 'client/alt';
import CommentAvatarsActions from 'actions/CommentAvatars.js';
import CommentsApi from 'services/Comments.js';
import ProfileApi from 'services/Profile.js';

const defaultAvatarUrl = 'https://www.learnmine.com/assets/img/medium-default-avatar.png';

class CommentAvatarsStore {

  constructor() {
    this.error = null;
    this.avatars = [];
    this.bindActions(CommentAvatarsActions);
  }

  onGet(ids) {
    Promise.all(ids.map(id => ProfileApi.hasAvatar(id)))
      .then((res) => {
        CommentsApi.getAvatars(res);
      })
      .catch((error) => {
        CommentAvatarsActions.error.defer(error);
      });

    return false;
  }

  onGetSuccess(avatars) {
    this.error = null;
    this.avatars = avatars;
    this.avatars.forEach((avatarObj) => {
      avatarObj.avatar = avatarObj.avatar || defaultAvatarUrl;
    });
  }

  onError(error) {
    this.error = error;
  }

  onInvalidateAvatars() {
    this.avatars = [];
    this.error = null;
  }

}

export default alt.createStore(CommentAvatarsStore, 'CommentAvatarsStore');
