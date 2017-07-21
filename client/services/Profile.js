import ProfileActions from 'actions/Profile.js';
import PromiseApi from 'services/PromiseApi.js';
import AuthStore from 'stores/user/Auth.js';


export default class ProfileApi {

  static get() {
    const credentials = AuthStore.getState().credentials;

    if (credentials) {
      ProfileApi.find(credentials.id);
    } else {
      ProfileActions.error.defer('Need to be logged in for that');
    }
  }

  static find(id) {
    PromiseApi.auth().get(`/profiles/${id}`)
      .then((res) => {
        ProfileActions.getSuccess.defer(res);
      })
      .catch((err) => {
        ProfileActions.error.defer(err);
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
