import PromiseApi from 'services/PromiseApi.js';
import SignupActions from 'actions/Signup.js';
import AuthActions from 'actions/Auth.js';
import LocationActions from 'actions/Location.js';

export default class SignupApi {

  static signup(form) {
    PromiseApi.post('/public/sign-up', form)
      .then((res) => {
        if (res.error) {
          SignupActions.error(res.error);
        } else {

            navigator.geolocation.getCurrentPosition((position) => {
            const coor = { lat: position.coords.latitude, lng: position.coords.longitude}
               LocationActions.sendLocation.defer(coor);
           },(err) => {
               console.log('ERROR During getCurrentPosition (' + err.code + '): ' + err.message);
           }, { maximumAge: 3000, timeout: 7000, enableHighAccuracy: true });

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
