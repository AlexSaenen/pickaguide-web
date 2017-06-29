import ProfileActions from 'actions/Profile.js';
import AvatarActions from 'actions/Avatar.js';
import PromiseApi from 'services/PromiseApi.js';
import AuthStore from 'stores/user/Auth.js';


export default class ProfileApi {

  static get() {
    const credentials = AuthStore.getState().credentials;

    if (credentials) {
      PromiseApi.auth().get(`/profiles/${credentials.id}`)
        .then((res) => {
          ProfileActions.getSuccess.defer(res);
        })
        .catch((err) => {
          ProfileActions.error.defer(err);
        });
    } else {
      ProfileActions.error.defer('Need to be logged in for that');
    }
  }

  static getAvatar() {
    const credentials = AuthStore.getState().credentials;

    if (credentials) {
      PromiseApi.download(`/public/profiles/${credentials.id}/avatar`)
        .then((res) => {
          AvatarActions.getSuccess.defer(res);
        })
        .catch((err) => {
          AvatarActions.error.defer(err);
        });
    } else {
      AvatarActions.error.defer('Need to be logged in for that');
    }
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
        AvatarActions.get.defer();
      })
      .catch((err) => {
        AvatarActions.error.defer(err);
      });
  }

  static update(form) {
    PromiseApi.auth().put('/profiles', form)
      .then((res) => {
        if (res.error) {
          ProfileActions.error(res.error);
        } else {
          ProfileActions.updateSuccess(res);
        }
      })
      .catch((err) => {
        ProfileActions.error(err);
      });
  }

}
