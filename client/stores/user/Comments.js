import alt from 'client/alt';
import CommentsActions from 'actions/Comments.js';
import CommentsApi from 'services/Comments.js';


class CommentsStore {

  constructor() {
    this.error = null;
    this.comments = [];
    this.id = '';
    this.bindActions(CommentsActions);
  }

  onGet(advertId) {
    CommentsApi.getFrom(advertId);
    this.comments = [];
    return false;
  }

  onGetSuccess(result) {
    this.error = null;
    this.comments = result.comments;
    this.id = result._id;
  }

  onError(error) {
    this.error = error;
  }

  onRemove(removeObj) {
    CommentsApi.remove(removeObj);
    return false;
  }

  onCreate(post) {
    CommentsApi.create(post);
    return false;
  }

  onInvalidateComments() {
    this.comments = [];
    this.error = null;
    this.id = '';
  }

}

export default alt.createStore(CommentsStore, 'CommentsStore');
