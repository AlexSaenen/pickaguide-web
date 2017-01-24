import SignupActions from '../actions/Signup.js';
import PromiseApi from './PromiseApi.js';

export default class SignupApi {
  static signup(form) {
    PromiseApi.post('/public/sign-up', form)
      .then((result) => {
        if (result.error) {
          SignupActions.signupError(result.error);
        } else {
          SignupActions.signupSuccess(result.message);
        }
      })
      .catch((err) => {
        SignupActions.signupError(err);
      });
  }
}
