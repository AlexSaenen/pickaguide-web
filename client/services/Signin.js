import SigninActions from '../actions/Signin.js';
import PromiseApi from './promiseApi.js';

export default class SigninApi {
    static getSignin(form) {
        console.log('Form signin:', form);
        PromiseApi.post('/account/signup', form)
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
