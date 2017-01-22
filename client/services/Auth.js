import ProfileActions from '../actions/Profile.js';
import AuthActions from '../actions/Auth.js';
import PromiseApi from './PromiseApi.js';

export default class AuthApi {
  static login(form) {
    PromiseApi.post('/public/sign-in', form)
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

  static logout() {
    PromiseApi.auth().get('/account/logout')
    .then((result) => {
      if (result.error) {
        AuthActions.logoutError(result.error);
      } else {
        AuthActions.logoutSuccess();
        ProfileActions.invalidateProfile();
      }
    })
    .catch((err) => {
      AuthActions.logoutError(err);
    });
  }
}
