import LoginActions from '../actions/Login.js';
import PromiseApi from './promiseApi.js';

export default class LoginApi {
  static getLogin(form) {
    PromiseApi.post('/public/login', form)
    .then((result) => {
      if (result.error) {
        LoginActions.requestLoginError(result.error);
      } else {
        LoginActions.requestLoginSuccess(result.token);
      }
    })
    .catch((err) => {
      LoginActions.requestLoginError(err);
    });
  }
}
