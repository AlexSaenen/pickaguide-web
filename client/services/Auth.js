import AuthActions from 'actions/Auth.js';
import PromiseApi from 'services/PromiseApi.js';
import CookieApi from 'services/Cookie.js';


export default class AuthApi {

  static login(form) {
    PromiseApi.post('/public/sign-in', form)
      .then((res) => {
        if (res.error) {
          AuthActions.error(res.error);
        } else {
          CookieApi.set('userToken', res.token);
          CookieApi.set('userId', res.id);
          AuthActions.loginSuccess(res);
          AuthActions.sync();
        }
      })
      .catch((err) => {
        AuthActions.error(err);
      });
  }

  static logout() {
    PromiseApi.auth().put('/accounts/logout')
      .then((res) => {
        if (res.error) {
          AuthActions.logoutError(res.error);
        } else {
          AuthActions.logoutSuccess();
        }
      })
      .catch((err) => {
        AuthActions.error(err);
      });
  }
}
