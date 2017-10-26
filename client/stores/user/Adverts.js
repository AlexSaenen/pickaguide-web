import alt from 'client/alt';
import AdvertsActions from 'actions/Adverts.js';
import AdvertsApi from 'services/Adverts.js';


class AdvertsStore {

  constructor() {
    this.error = null;
    this.adverts = [];
    this.specificAdvert = null;
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

  onGetFrom(userId) {
    AdvertsApi.getFrom(userId);
    return false;
  }

  onGetSuccess(adverts) {
    this.error = null;
    this.adverts = adverts.reverse();
  }

  onFindMain() {
    AdvertsApi.findMain();
    return false;
  }

  onFind(advertId) {
    AdvertsApi.find(advertId);
    return false;
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

  onRemove(advertId) {
    AdvertsApi.remove(advertId);
    return false;
  }

  onInvalidateAdverts() {
    this.adverts = [];
    this.specificAdvert = null;
    this.error = null;
  }

}

export default alt.createStore(AdvertsStore, 'AdvertsStore');
