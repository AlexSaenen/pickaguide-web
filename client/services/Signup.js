import PromiseApi from 'services/PromiseApi.js';
import SignupActions from 'actions/Signup.js';
import AuthActions from 'actions/Auth.js';


export default class SignupApi {

  static signup(form) {
    PromiseApi.post('/public/sign-up', form)
      .then((res) => {
        console.log('--- SIGNUP ---', res);
        if (res.error) {
          SignupActions.error(res.error);
        } else {
          SignupActions.signupSuccess(res.message);
          AuthActions.login({
            email: form.email,
            password: form.password,
          });
        }
      })
      .catch((err) => {
        SignupActions.error(err);
      });
  }
}
