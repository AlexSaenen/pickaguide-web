import SearchActions from 'actions/Search.js';
import PromiseApi from 'services/PromiseApi.js';


export default class SearchApi {

  static search(form) {
    PromiseApi.get(`/public/search/filter/${encodeURIComponent(form.text)}`)
      .then((res) => {
        SearchActions.searchSuccess(res);
      })
      .catch((err) => {
        SearchActions.error(err);
      });
  }
}
