import AdvertsActions from 'actions/Adverts.js';
import PromiseApi from 'services/PromiseApi.js';
import AuthStore from 'stores/user/Auth.js';


export default class AdvertsApi {

  static get() {
    const credentials = AuthStore.getState().credentials;

    if (credentials) {
      PromiseApi.auth().get(`/profiles/${credentials.id}`)
        .then((res) => {
          AdvertsActions.getSuccess.defer(res);
        })
        .catch((err) => {
          AdvertsActions.error.defer(err);
        });
    } else {
      AdvertsActions.error.defer('Need to be logged in for that');
    }
  }

  static create(form) {
    console.log("form", form);
    PromiseApi.auth().put('/adverts', form)
      .then((res) => {
        if (res.error) {
          AdvertsActions.error(res.error);
        } else {
          AdvertsActions.createSuccess(res);
        }
      })
      .catch((err) => {
        AccountActions.error(err);
      });
  }

}
