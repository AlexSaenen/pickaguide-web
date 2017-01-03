import ProfileActions from '../actions/Profile.js';
import AuthActions from '../actions/Auth.js';
import PromiseApi from './PromiseApi.js';

export default class AuthApi {
  static login(form) {
    PromiseApi.post('/public/login', form)
    .then((result) => {
      if (result.error) {
        AuthActions.loginError(result.error);
      } else {
        AuthActions.loginSuccess(result.token);
        ProfileActions.getProfile();
      }
    })
    .catch((err) => {
      AuthActions.loginError(err);
    });
  }
}
