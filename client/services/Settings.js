import SigninActions from 'actions/Signin.js';
import PromiseApi from 'services/PromiseApi.js';


export default class ProfileApi {

  static getProfile(form) {
    PromiseApi.get('/profile')
    .then((res) => {
        if (res.error) {
            SigninActions.requestSigninError(res.error);
            return;
        }

        SigninActions.requestSigninSuccess(res);
    })
    .catch((err) => {
        SigninActions.requestSigninError(err);
    });
  }
}
