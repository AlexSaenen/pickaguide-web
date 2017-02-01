import ProfileActions from 'actions/Profile.js';
import AccountActions from 'actions/Account.js';
import AuthActions from 'actions/Auth.js';
import PromiseApi from 'services/PromiseApi.js';
import CookieApi from 'services/Cookie.js';


export default class AuthApi {

  static login(form) {
    PromiseApi.post('/public/sign-in', form)
      .then((res) => {
          console.log('Res login:', res);
        if (res.error) {
          AuthActions.loginError(res.error);
        } else {
          CookieApi.override([{ key: 'userToken', value: res.token }, { key: 'userId', value: res.id }]);
          AuthActions.loginSuccess(res);
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
      .then((res) => {
        if (res.error) {
          AuthActions.logoutError(res.error);
        } else {
          CookieApi.revoke();
          AuthActions.logoutSuccess();
          // ProfileActions.invalidateProfile();
          // AccountActions.invalidateAccount();
        }
      })
      .catch((err) => {
        AuthActions.logoutError(err);
      });
  }
}
