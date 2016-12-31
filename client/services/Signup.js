import SignupActions from '../actions/Signup.js';
import PromiseApi from './promiseApi.js';

export default class SignupApi {
    static getSignup(form) {
        console.log('Form signup:', form);
        PromiseApi.post('/account/signup', form)
        .then((result) => {
            if (result.error) {
                SignupActions.requestSignupError(result.error);
                return;
            }

            SignupActions.requestSignupSuccess(result);
        })
        .catch((err) => {
            SignupActions.requestSignupError(err);
        });
    }
}
