import alt from 'client/alt';
import AdvertsActions from 'actions/Adverts.js';
import AdvertsApi from 'services/Adverts.js';


class AdvertsStore {

  constructor() {
    this.error = null;
    this.adverts = [];
    this.specificAdvert = {};
    this.bindActions(AdvertsActions);
  }

  onToggle(advertId) {
    AdvertsApi.toggle(advertId);
    return false;
  }

  onGet() {
    AdvertsApi.getMine();
    return false;
  }

  onGetSuccess(adverts) {
    this.error = null;
    this.adverts = adverts;
  }

  onFind(advertId) {
    AdvertsApi.find(advertId);
  }

  onFindSuccess(advert) {
    this.specificAdvert = advert;
    this.error = null;
  }

  onError(error) {
    this.error = error;
  }

  onUpdate(advert) {
    AdvertsApi.update(advert);
    return false;
  }

  onUpdateSuccess(advert) {
    this.specificAdvert = advert;
    this.error = null;
    AdvertsApi.getMine();
  }

  onCreate(form) {
    AdvertsApi.create(form);
    return false;
  }

  onInvalidateAdverts() {
    this.adverts = [];
  }

}

export default alt.createStore(AdvertsStore, 'AdvertsStore');
