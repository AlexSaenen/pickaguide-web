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

  onPay() {
    PaymentApi.pay();
    return false;
  }

}

export default alt.createStore(PaymentStore, 'PaymentStore');
