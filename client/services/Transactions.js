import TransactionsActions from 'actions/Transactions.js';
import PromiseApi from 'services/PromiseApi.js';


export default class TransactionsApi {

  static get() {
    PromiseApi.auth().get('/payment/')
      .then((res) => {
        if (res.error) {
          TransactionsActions.error(res.error);
        } else {
          TransactionsActions.getSuccess(res);
        }
      })
      .catch((err) => {
        TransactionsActions.error(err);
      });
  }

}
