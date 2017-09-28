import alt from 'client/alt';
import TransactionsActions from 'actions/Transactions.js';
import TransactionApi from 'services/Transactions.js';


class TransactionsStore {

  constructor() {
    this.error = null;
    this.transactions = null;
    this.bindActions(TransactionsActions);
  }

  onGet() {
    TransactionApi.get();
    return false;
  }

  onGetSuccess(transactions) {
    this.error = null;
    this.transactions = transactions;
  }

  onError(error) {
    this.error = error;
  }

}

export default alt.createStore(TransactionsStore, 'TransactionsStore');
