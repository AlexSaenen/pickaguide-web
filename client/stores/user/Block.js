import alt from 'client/alt';
import { browserHistory } from 'react-router';
import BlockActions from 'actions/Block.js';
import UserApi from 'services/User.js';


class BlockStore {

  constructor() {
    this.error = null;
    this.isBlocking = null;
    this.bindActions(BlockActions);
  }

  onIsBlocking() {
    UserApi.isBlocking();
    return false;
  }

  onIsBlockingSuccess(isBlocking) {
    this.isBlocking = isBlocking;

    if (this.isBlocking) {
      const testOnReview = /^\/visits\/([a-z0-9]{24}\/)?review$/;
      if (browserHistory.location === undefined || testOnReview.test(browserHistory.location.pathname) === false) {
        browserHistory.push('/visits/review');
      }
    }

    this.error = null;
  }

  onError(error) {
    this.error = error;
  }

  onInvalidateBlock() {
    this.error = null;
    this.isBlocking = null;
  }

}

export default alt.createStore(BlockStore, 'BlockStore');
