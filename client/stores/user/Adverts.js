import alt from 'client/alt';
import AdvertsActions from 'actions/Adverts.js';
import AdvertsApi from 'services/Adverts.js';


class AdvertsStore {

  constructor() {
    this.error = null;
    this.adverts = [];
    this.bindActions(AdvertsActions);
  }

  onGet() {
    AdvertsApi.getMine();
    return false;
  }

  onGetSuccess(adverts) {
    this.error = null;
    this.adverts = adverts;
  }

  onError(error) {
    this.error = error;
  }

  onCreate(form) {
    AdvertsApi.create(form);
    return false;
  }

}

export default alt.createStore(AdvertsStore, 'AdvertsStore');
