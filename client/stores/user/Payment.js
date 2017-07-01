import alt from 'client/alt';
import PaymentActions from 'actions/Payment.js';
import PaymentApi from 'services/Payment.js';


class PaymentStore {

  constructor() {
    this.error = null;
    this.cards = [];
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
    console.log(infos);
    this.error = null;
    this.cards = infos.cards;
  }

}

export default alt.createStore(PaymentStore, 'PaymentStore');
