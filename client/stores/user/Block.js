import alt from 'client/alt';
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
