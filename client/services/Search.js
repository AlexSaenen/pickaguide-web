import SearchActions from 'actions/Search.js';
import PromiseApi from 'services/PromiseApi.js';


export default class SearchApi {

  static search(form) {
    PromiseApi.get(`/public/search/filter/${encodeURIComponent(form.text)}`)
      .then((res) => {
        res.avatars = [];

        Promise
          .all(res.ids.map((userId, index) => {
            return new Promise((resolve, reject) => {
              PromiseApi.download(`/public/profiles/${userId}/avatar`)
                .then((avatar) => {
                  res.avatars[index] = avatar;
                  resolve();
                })
                .catch(err => reject(err));
            });
          }))
          .then(() => {
            SearchActions.searchSuccess(res);
          })
          .catch((err) => {
            SearchActions.error(err);
          });
      })
      .catch((err) => {
        SearchActions.error(err);
      });
  }
}
