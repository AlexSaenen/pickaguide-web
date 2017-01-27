// import ProfileActions from 'actions/Profile.js';
// import AccountActions from 'actions/Account.js';
import AuthActions from 'actions/Auth.js';
import PromiseApi from 'services/PromiseApi.js';


export default class AuthApi {

  // TODO: Alex: Store token into a cookie
  static login(form) {
    PromiseApi.post('/public/sign-in', form)
      .then((result) => {
        if (result.error) {
          AuthActions.loginError(result.error);
        } else {
          AuthApi.storeTokenToCookie(result.token);
          AuthActions.loginSuccess(result.token);
          // ProfileActions.get();
          // AccountActions.get();
        }
      })
      .catch((err) => {
        AuthActions.loginError(err);
      });
  }

  // TODO: Alex: Delete cookie containing token
  static logout() {
    PromiseApi.auth().get('/account/logout')
      .then((result) => {
        if (result.error) {
          AuthActions.logoutError(result.error);
        } else {
          AuthApi.invalidateToken();
          AuthActions.logoutSuccess();
          // ProfileActions.invalidateProfile();
          // AccountActions.invalidateAccount();
        }
      })
      .catch((err) => {
        AuthActions.logoutError(err);
      });
  }

  static storeTokenToCookie(token) {
    document.cookie = `userToken=${token}`;
  }

  static getTokenFromCookie() {
    const cookiePairs = document.cookie.split(';');
    const cookieSplitPairs = cookiePairs.map(pair => {
      const splitPair = pair.split('=');
      return { key: splitPair[0], value: splitPair[1] };
    });

    const tokenPair = cookieSplitPairs.find(pair => pair.key === 'userToken');
    return (tokenPair ? tokenPair.value : null);
  }

  static invalidateToken() {
    document.cookie = '';
  }
}
