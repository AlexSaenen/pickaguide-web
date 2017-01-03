import ProfileActions from '../actions/Profile.js';
import PromiseApi from './PromiseApi.js';

export default class ProfileApi {
  static getProfile() {
    PromiseApi.auth().get('/profile')
    .then((result) => {
      if (result.error) {
        ProfileActions.getProfileError(result.error);
      } else {
        ProfileActions.getProfileSuccess(result);
      }
    })
    .catch((err) => {
      ProfileActions.getProfileError(err);
    });
  }
}
