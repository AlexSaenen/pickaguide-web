import { browserHistory } from 'react-router';

import PaymentActions from 'actions/Payment.js';
import BlockActions from 'actions/Block.js';
import PaymentStore from 'stores/user/Payment.js';
import PromiseApi from 'services/PromiseApi.js';

export default class PaymentApi {

  static getInfos() {
    PromiseApi.auth().get('/payment/getInfos')
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
    PromiseApi.auth().post('/payment/addCard', form)
      .then((res) => {
        if (res.error) {
          PaymentActions.error(res.error);
        } else {
          const cards = PaymentStore.getState().infos.sources.data;
          cards.push(res);
          PaymentActions.getInfosSuccess(PaymentStore.getState().infos);
        }
      })
      .catch((err) => {
        PaymentActions.error(err);
      });
  }

  static pay() {
    PromiseApi.auth().post('/payment/unblock')
      .then((res) => {
        if (res.error) {
          PaymentActions.error(res.error);
        } else {
          browserHistory.push('/');
          BlockActions.isBlockingSuccess(res.isBlocking);
          // PaymentActions.paySuccess(PaymentStore.getState().infos);
        }
      })
      .catch((err) => {
        PaymentActions.error(err);
      });
  }

  // static pay(form) {
  //   PromiseApi.auth().post('/payment/pay', form)
  //     .then((res) => {
  //       if (res.error) {
  //         PaymentActions.error(res.error);
  //       } else {
  //         PaymentActions.paySuccess(PaymentStore.getState().infos);
  //       }
  //     })
  //     .catch((err) => {
  //       PaymentActions.error(err);
  //     });
  // }
  //
}
