import ProfileActions from 'actions/Profile.js';
import PromiseApi from 'services/PromiseApi.js';


export default class ProfileApi {

  static get() {
    PromiseApi.auth().get('/profile')
    .then((result) => {
      if (result.error) {
        ProfileActions.getError(result.error);
      } else {
        ProfileActions.getSuccess(result);
      }
    })
    .catch((err) => {
      ProfileActions.getError(err);
    });
  }
}
