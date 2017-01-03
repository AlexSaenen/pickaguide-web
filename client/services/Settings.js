import SigninActions from '../actions/Signin.js';
import PromiseApi from './PromiseApi.js';

export default class ProfileApi {
  static getProfile(form) {
    PromiseApi.get('/profile')
    .then((result) => {
        if (result.error) {
            SigninActions.requestSigninError(result.error);
            return;
        }

        SigninActions.requestSigninSuccess(result);
    })
    .catch((err) => {
        SigninActions.requestSigninError(err);
    });
  }
}
