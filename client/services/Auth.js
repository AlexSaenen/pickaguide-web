import ProfileActions from 'actions/Profile.js';
import AccountActions from 'actions/Account.js';
import AuthActions from 'actions/Auth.js';
import PromiseApi from 'services/PromiseApi.js';
import CookieApi from 'services/Cookie.js';


export default class AuthApi {

  static login(form) {
    PromiseApi.post('/public/sign-in', form)
      .then((res) => {
        if (res.error) {
          AuthActions.loginError(res.error);
        } else {
          CookieApi.set('userToken', res.token);
          CookieApi.set('userId', res.id);
          AuthActions.loginSuccess(res);
          AuthActions.sync();
          
          AccountActions.get(); // adapt with new API and pass id in query
          ProfileActions.get(); // adapt with new API and pass id in query
        }
      })
      .catch((err) => {
        AuthActions.loginError(err);
      });
  }

  static logout() {
    PromiseApi.auth().get('/account/logout')
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
