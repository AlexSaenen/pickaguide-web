import PaymentActions from 'actions/Payment.js';
import PaymentStore from 'stores/user/Payment.js';
import PromiseApi from 'services/PromiseApi.js';

export default class PaymentApi {

  static getInfos() {
    PromiseApi.auth().get('/payment/')
      .then((res) => {
        if (res.error) {
          PaymentActions.error(res.error);
        } else {
          PaymentActions.getInfosSuccess(res);
        }
      })
      .catch((err) => {
        PaymentActions.error(err);
      });
  }

  static newCard(form) {
    PromiseApi.auth().post('/payment/card', form)
      .then((res) => {
        if (res.error) {
          PaymentActions.error(res.error);
        } else {
          const infos = PaymentStore.getState().infos;
          infos.sources.data.push(res);
          PaymentActions.getInfosSuccess(infos);
        }
      })
      .catch((err) => {
        PaymentActions.error(err);
      });
  }

  static deleteCard(idCard) {
    PromiseApi.auth().delete(`/payment/card/${idCard}`)
      .then((res) => {
        if (res.error) {
          PaymentActions.error(res.error);
        } else {
          const infos = PaymentStore.getState().infos;
          infos.sources.data = infos.sources.data.filter(card => card.id !== idCard);
          PaymentActions.getInfosSuccess(infos);
        }
      })
      .catch((err) => {
        PaymentActions.error(err);
      });
  }

  static pay(form) {
    PromiseApi.auth().post('/payment/pay', form)
      .then((res) => {
        if (res.error) {
          PaymentActions.error(res.error);
        } else {
          PaymentActions.paySuccess(PaymentStore.getState().infos);
        }
      })
      .catch((err) => {
        PaymentActions.error(err);
      });
  }

}
