import SigninActions from '../actions/Signin.js';
import PromiseApi from './promiseApi.js';

export default class SigninApi {
    static getSignin(form) {
      console.log('---', form);
        PromiseApi.post('/user/Signin')
        .then((result) => {
            if (result.error) {
                SigninActions.requestSigninError(result.error);
                return;
            }

            SigninActions.requestSigninSuccess(result.signin);
        })
        .catch((err) => {
            SigninActions.requestSigninError(err);
        });
    }
}
