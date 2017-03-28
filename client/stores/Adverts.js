import alt from 'client/alt';
import AdvertsActions from 'actions/Adverts.js';
import AdvertsApi from 'services/Adverts.js';


class AdvertsStore {

  constructor() {
    this.error = null;
    this.adverts = null;
    this.bindActions(AdvertsActions);
  }

  onGet() {
    AdvertsApi.get();
    return false;
  }

  onGetSuccess(adverts) {
    this.error = null;
    this.adverts = adverts;
  }

  onError(error) {
    this.error = error;
    this.adverts = null;
  }

  onCreate(from) {
    AdvertsApi.create(form);
    return false;
  }

  onCreateSuccess(adverts) {
    this.error = null;
    this.adverts = adverts;
  }

}

export default alt.createStore(AdvertsStore, 'AdvertsStore');
