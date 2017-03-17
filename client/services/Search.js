import SearchActions from 'actions/Search.js';
import PromiseApi from 'services/PromiseApi.js';


export default class SearchApi {

  static search(form) {
    PromiseApi.get('/search/filter')
      .then((res) => {
        SearchActions.searchSuccess(res);
      })
      .catch((err) => {
        SearchActions.searchError(err);
      });
  }
}
