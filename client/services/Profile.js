import ProfileActions from 'actions/Profile.js';
import PromiseApi from 'services/PromiseApi.js';
import AuthStore from 'stores/Auth.js';


export default class ProfileApi {

  static get() {
    const credentials = AuthStore.getState().credentials;

    if (credentials) {
      PromiseApi.auth().get(`/profile/${credentials.id}`)
        .then((res) => {
          ProfileActions.getSuccess.defer(res);
        })
        .catch((err) => {
          ProfileActions.getError.defer(err);
        });
    } else {
      ProfileActions.getError.defer('Need to be logged in for that');
    }
  }
}
