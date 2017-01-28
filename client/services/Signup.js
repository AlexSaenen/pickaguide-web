import SignupActions from 'actions/Signup.js';
import PromiseApi from 'services/PromiseApi.js';


export default class SignupApi {

  static signup(form) {
    PromiseApi.post('/public/sign-up', form)
      .then((res) => {
        if (res.error) {
          SignupActions.signupError(res.error);
        } else {
          SignupActions.signupSuccess(res.message);
        }
      })
      .catch((err) => {
        SignupActions.signupError(err);
      });
  }
}
