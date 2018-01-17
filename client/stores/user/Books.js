import alt from 'client/alt';
import BookActions from 'actions/Book.js';
import BooksApi from 'services/Books.js';


class BooksStore {

  constructor() {
    this.error = null;
    this.visits = [];
    this.specificVisit = null;
    this.bindActions(BookActions);
  }

  onError(error) {
    this.error = error;
  }

  onFind(visitId) {
    BooksApi.find(visitId);
    return false;
  }

  onFindSuccess(visit) {
    this.specificVisit = visit;
    this.error = null;
  }

  onUpdate(form) {
    BooksApi.update(form);
    return false;
  }

  onUpdateSuccess() {
    this.error = null;
    this.specificVisit = null;
  }

  onGet() {
    BooksApi.get();
    return false;
  }

  onGetSuccess(visits) {
    this.error = null;
    this.visits = visits;
  }

}

export default alt.createStore(BooksStore, 'BooksStore');
