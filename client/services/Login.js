import LoginActions from '../actions/Login.js';
import PromiseApi from './promiseApi.js';

export default class LoginApi {
    static getLogin(form) {
      console.log('LogIn :', form);
        PromiseApi.post('/user/Login', form)
        .then((result) => {
            if (result.error) {
                LoginActions.requestLoginError(result.error);
                return;
            }
            LoginActions.requestLoginSuccess(result.login);
        })
        .catch((err) => {
            LoginActions.requestLoginError("ERREUR !");
        });
    }
}
