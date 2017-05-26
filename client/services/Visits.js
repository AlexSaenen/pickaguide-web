import VisitsActions from 'actions/Visits.js';
import PromiseApi from 'services/PromiseApi.js';


export default class VisitsApi {

  static visit(advertId, form) {
    PromiseApi.auth().put(`/proposals/${advertId}/visit`, form)
      .then((res) => {
        if (res.error) {
          VisitsActions.error(res.error);
        } else {
          VisitsActions.visitSuccess();
        }
      })
      .catch((err) => {
        VisitsActions.error(err);
      });
  }

}
