import alt from 'client/alt';
import { browserHistory } from 'react-router';
import AdvertsActions from 'actions/Adverts.js';
import AdvertsApi from 'services/Adverts.js';

const filterThings = (element, filters, filterKeys) => {
  let keep = true;

  filterKeys.forEach((key) => {
    const filterRow = filters[key];

    if (filterRow.length !== 0 && keep !== false) {
      if (filterRow.find(el => el.field === element[key]) !== undefined) {
        keep = true;
      } else {
        keep = false;
      }
    }
  });

  element.hide = !keep;
};

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

  onFindAll() {
    AdvertsApi.findAll();
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

  onApplyFilters(filters) {
    const filterKeys = Object.keys(filters);
    filterKeys.forEach((key) => {
      filters[key] = filters[key].filter(el => el.active);
    });

    this.adverts.forEach(advert => filterThings(advert, filters, filterKeys));
  }

  onUpdate(advert) {
    AdvertsApi.update(advert);
    return false;
  }

  onUpdateSuccess(advert) {
    this.specificAdvert = advert;
    this.error = null;
    browserHistory.push('/guide/adverts');
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
