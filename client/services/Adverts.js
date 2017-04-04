import AdvertsActions from 'actions/Adverts.js';
import PromiseApi from 'services/PromiseApi.js';


export default class AdvertsApi {

  static create(form) {
    PromiseApi.auth().post('/proposals', form)
      .then((res) => {
        if (res.error) {
          AdvertsActions.error(res.error);
        } else {
          AdvertsActions.getSuccess(res.adverts);
        }
      })
      .catch((err) => {
        AdvertsActions.error(err);
      });
  }

  static getMine() {
    PromiseApi.auth().get('/proposals')
      .then((res) => {
        if (res.error) {
          AdvertsActions.error(res.error);
        } else {
          AdvertsActions.getSuccess(res.adverts);
        }
      })
      .catch((err) => {
        AdvertsActions.error(err);
      });
  }

  static toggle(advertId) {
    PromiseApi.auth().put(`/proposals/${advertId}/toggle`)
      .then((res) => {
        if (res.error) {
          AdvertsActions.error(res.error);
        } else {
          AdvertsActions.getSuccess(res.adverts);
        }
      })
      .catch((err) => {
        AdvertsActions.error(err);
      });
  }

}
