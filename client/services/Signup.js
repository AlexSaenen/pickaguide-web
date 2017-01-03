import SignupActions from '../actions/Signup.js';
import PromiseApi from './promiseApi.js';

export default class SignupApi {
  static getSignup(form) {
    PromiseApi.post('/public/signup', form)
    .then((result) => {
      if (result.error) {
        SignupActions.requestSignupError(result.error);
      } else {
        SignupActions.requestSignupSuccess(result.message);
      }
    })
    .catch((err) => {
      SignupActions.requestSignupError(err);
    });
  }
}
