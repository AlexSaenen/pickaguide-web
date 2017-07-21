import alt from 'client/alt';
import CommentAvatarsActions from 'actions/CommentAvatars.js';
import CommentsApi from 'services/Comments.js';


class CommentAvatarsStore {

  constructor() {
    this.error = null;
    this.avatars = [];
    this.bindActions(CommentAvatarsActions);
  }

  onGet(ids) {
    CommentsApi.getAvatars(ids);
    return false;
  }

  onGetSuccess(avatars) {
    this.error = null;
    this.avatars = avatars;
    this.avatars.forEach((avatarObj) => {
      avatarObj.avatar = avatarObj.avatar || '';
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
