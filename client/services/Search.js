import SearchActions from 'actions/Search.js';
import ProfileActions from 'actions/SearchProfile.js';
import AccountActions from 'actions/SearchAccount.js';
import AvatarActions from 'actions/SearchAvatar.js';
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

  static findProfile(id) {
    PromiseApi.get(`/public/profiles/${id}`)
      .then((res) => {
        ProfileActions.getSuccess.defer(res);
      })
      .catch((err) => {
        ProfileActions.error.defer(err);
      });
  }

  static getAvatar(id) {
    PromiseApi.download(`/public/profiles/${id}/avatar`)
      .then((res) => {
        AvatarActions.getSuccess.defer(res);
      })
      .catch((err) => {
        AvatarActions.error.defer(err);
      });
  }

  static isConfirmed(id) {
    PromiseApi.get(`/public/accounts/${id}/isConfirmed`)
      .then((res) => {
        if (res.error) {
          AccountActions.error(res.error);
        } else {
          AccountActions.isConfirmedSuccess(res.isConfirmed);
        }
      })
      .catch((err) => {
        AccountActions.error(err);
      });
  }

  static getAccount(id) {
    PromiseApi.get(`/accounts/${id}`)
      .then((res) => {
        AccountActions.getSuccess.defer(res);
      })
      .catch((err) => {
        AccountActions.error.defer(err);
      });
  }

}
