import ProfileActions from 'actions/Profile.js';
import PromiseApi from 'services/PromiseApi.js';


export default class ProfileApi {

  static get() {
    PromiseApi.auth().get('/profile')
    .then((res) => {
      if (res.error) {
        ProfileActions.getError(res.error);
      } else {
        ProfileActions.getSuccess(res);
      }
    })
    .catch((err) => {
      ProfileActions.getError(err);
    });
  }
}
