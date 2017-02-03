import ProfileActions from 'actions/Profile.js';
import AccountActions from 'actions/Account.js';
import AuthActions from 'actions/Auth.js';
import PromiseApi from 'services/PromiseApi.js';
import CookieApi from 'services/Cookie.js';


export default class AuthApi {

  static login(form) {
    PromiseApi.post('/public/sign-in', form)
      .then((res) => {
        CookieApi.set('userToken', res.token);
        CookieApi.set('userId', res.id);
        AuthActions.loginSuccess(res);
        AuthActions.sync();
      })
      .catch((err) => {
        AuthActions.loginError(err);
      });
  }

  static logout() {
    PromiseApi.auth().get('/accounts/logout')
      .then(() => {
        CookieApi.revoke();
        AuthActions.logoutSuccess();
        ProfileActions.invalidateProfile();
        AccountActions.invalidateAccount();
      })
      .catch((err) => {
        AuthActions.logoutError(err);
      });
  }
}
