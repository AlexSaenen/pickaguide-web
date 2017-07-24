import AvatarActions from 'actions/Avatar.js';
import ProfileActions from 'actions/Profile.js';
import CacheAvatarActions from 'actions/CacheAvatar.js';
import PromiseApi from 'services/PromiseApi.js';
import AvatarCache from 'stores/cache/Avatar.js';


const retrieveFromCache = (hash) => {
  const cache = AvatarCache.getState();
  const cacheIndex = cache.hashMap.indexOf(hash);

  if (cacheIndex !== -1) {
    return cache.avatars[cacheIndex];
  }

  return null;
};

const retrieveAvatar = (id, forceCache) => {
  return new Promise((resolve, reject) => {
    const avatar = retrieveFromCache(id);

    if (avatar && forceCache !== true) {
      resolve(avatar);
    } else {
      PromiseApi.download(`/public/profiles/${id === 'default' ? '' : `${id}/`}avatar`)
        .then((res) => {
          const block = {};
          block[id] = res;
          CacheAvatarActions.cache.defer(block);
          resolve(res);
        })
        .catch(err => reject(err));
    }
  });
};

export default class AvatarApi {

  static getAvatar(id, actions, hasAvatar, forceCache = false) {
    new Promise((resolve, reject) => {
      if (hasAvatar === undefined) {
        AvatarApi.hasAvatar(id)
          .then(res => resolve(res.hasAvatar))
          .catch(err => reject(err));
      } else {
        resolve(hasAvatar);
      }
    })
      .then(userHasAvatar => retrieveAvatar(userHasAvatar ? id : 'default', forceCache))
      .then(avatar => actions.getSuccess.defer({ id, avatar }))
      .catch(err => actions.error.defer(err));
  }

  static getAvatars(ids, haveAvatars) {
    return new Promise((resolve, reject) => {
      new Promise((resolveHas, rejectHas) => {
        if (ids.length !== haveAvatars.length) {
          Promise
            .all(ids.map(id => AvatarApi.hasAvatar(id)))
            .then(res => resolveHas(res.map(el => el.hasAvatar)))
            .catch(err => rejectHas(err));
        } else {
          resolveHas(haveAvatars);
        }
      })
        .then((userHaveAvatars) => {
          let isLoadingDefault = false;
          let defaultAvatar = null;

          Promise
            .all(ids.map((id, index) => {
              const hasAvatar = userHaveAvatars[index];

              if (hasAvatar) {
                return retrieveAvatar(id);
              }

              if (isLoadingDefault === false) {
                isLoadingDefault = true;

                return new Promise((resolveDefault, rejectDefault) => {
                  retrieveAvatar('default')
                    .then((avatar) => {
                      defaultAvatar = avatar;
                      resolveDefault(avatar);
                    })
                    .catch(err => rejectDefault(err));
                });
              }

              return new Promise(resolveWaitingDefault => resolveWaitingDefault(null));
            }))
            .then(avatars => resolve(avatars.map(avatar => avatar || defaultAvatar)))
            .catch(err => reject(err));
        })
        .catch(err => reject(err));
    });
  }

  static hasAvatar(userId) {
    return PromiseApi.get(`/public/profiles/${userId}/avatar/available`);
  }

  static updateAvatar(form) {
    if (form.picture.name.match(/.(jpg|jpeg|png|gif)$/i) === false) {
      AvatarActions.error('Need an image');
      return;
    }

    const fileUpload = new FormData();
    fileUpload.append('avatar', form.picture, form.picture.name, 'avatar');

    PromiseApi.auth().upload('/profiles/avatar', fileUpload)
      .then(() => {
        AvatarActions.get.defer(true);
        ProfileActions.hasAvatar.defer(true);
      })
      .catch((err) => {
        AvatarActions.error.defer(err);
      });
  }

  static remove() {
    PromiseApi.auth().delete('/profiles/avatar')
      .then(() => {
        AvatarActions.get.defer(false);
        ProfileActions.hasAvatar.defer(false);
      })
      .catch((err) => {
        AvatarActions.error.defer(err);
      });
  }

}
