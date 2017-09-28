import alt from 'client/alt';
import PaymentActions from 'actions/Payment.js';
import PaymentApi from 'services/Payment.js';


class PaymentStore {

  constructor() {
    this.error = null;
    this.infos = null;
    this.bindActions(PaymentActions);
  }

  onError(error) {
    this.error = error;
  }

  onGetInfos() {
    PaymentApi.getInfos();
    return false;
  }

  onGetInfosSuccess(infos) {
    this.error = null;
    this.infos = infos;
  }

  onNewCard(form) {
    PaymentApi.newCard(form);
    return false;
  }

  onPay(form) {
    PaymentApi.pay(form);
    return false;
  }

  // TODO this looks like onGetInfosSuccess

  onPaySuccess(infos) {
    this.error = null;
    this.infos = infos;
  }

}

export default alt.createStore(PaymentStore, 'PaymentStore');
