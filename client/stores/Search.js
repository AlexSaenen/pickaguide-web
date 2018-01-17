import alt from 'client/alt';
import SearchActions from 'actions/Search.js';
import SearchApi from 'services/Search.js';

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

class SearchStore {

  constructor() {
    this.error = null;
    this.results = {};
    this.bindActions(SearchActions);
  }

  onSearch(form) {
    SearchApi.search(form.terms);
    return false;
  }

  onSearchSuccess(res) {
    this.error = null;
    this.results = res;
    this.filtered = res;
  }

  onApplyFilters(filters) {
    const filterKeys = Object.keys(filters);
    filterKeys.forEach((key) => {
      filters[key] = filters[key].filter(el => el.active);
    });

    this.results.adverts.forEach(advert => filterThings(advert, filters, filterKeys));
    this.results.profiles.forEach(profile => filterThings(profile, filters, filterKeys));
  }

  onError(error) {
    this.error = error;
    this.results = {};
  }
}

export default alt.createStore(SearchStore, 'SearchStore');
