import SearchActions from 'actions/Search.js';
import ProfileActions from 'actions/SearchProfile.js';
import AccountActions from 'actions/SearchAccount.js';
import AvatarActions from 'actions/SearchAvatar.js';
import CacheAvatarActions from 'actions/CacheAvatar.js';
import PromiseApi from 'services/PromiseApi.js';
import AvatarCache from 'stores/cache/Avatar.js';

const defaultAvatarUrl = 'https://www.learnmine.com/assets/img/medium-default-avatar.png';


export default class SearchApi {

  static search(term) {
    const cache = AvatarCache.getState();
    const hash = cache.hashMap;

    PromiseApi.get(`/public/search/filter/${encodeURIComponent(term)}`)
      .then((res) => {
        res.avatars = [];
        const block = {};

        Promise
          .all(res.ids.map((userId, index) => {
            return new Promise((resolve, reject) => {
              if (res.profiles[index].hasAvatar) {
                const cacheIndex = hash.indexOf(userId);

                if (cacheIndex !== -1) {
                  res.avatars[index] = cache.avatars[cacheIndex];
                  resolve();
                } else {
                  PromiseApi.download(`/public/profiles/${userId}/avatar`)
                    .then((avatar) => {
                      block[userId] = avatar;
                      res.avatars[index] = avatar;
                      resolve();
                    })
                    .catch(err => reject(err));
                }
              } else {
                res.avatars[index] = defaultAvatarUrl;
                resolve();
              }
            });
          }))
          .then(() => {
            if (Object.keys(block).length > 0) {
              CacheAvatarActions.cache.defer(block);
            }

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
    const cache = AvatarCache.getState();
    const hash = cache.hashMap;
    const index = hash.indexOf(id);

    if (index !== -1) {
      AvatarActions.getSuccess.defer({ userId: id, avatar: cache.avatars[index] });
    } else {
      PromiseApi.download(`/public/profiles/${id}/avatar`)
        .then((res) => {
          const block = {};
          block[id] = res;
          CacheAvatarActions.cache.defer(block);
          AvatarActions.getSuccess.defer({ userId: id, avatar: res });
        })
        .catch((err) => {
          AvatarActions.error.defer(err);
        });
    }
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
