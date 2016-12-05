import SigninActions from '../actions/Signin.js';
import PromiseApi from './promiseApi.js';

export default class ProfileApi {
    static getProfile(form) {
        console.log('Form signin:', form);
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
