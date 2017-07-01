import PaymentActions from 'actions/Payment.js';
import PromiseApi from 'services/PromiseApi.js';

export default class PaymentApi {

  static getInfos() {
    PromiseApi.auth().get('/payment/getInfos')
      .then((res) => {
        if (res.error) {
          PaymentActions.error(res.error);
        } else {
          PaymentActions.getInfosSuccess(res.infos);
        }
      })
      .catch((err) => {
        PaymentActions.error(err);
      });
  }

}
