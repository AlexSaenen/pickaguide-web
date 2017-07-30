import alt from 'client/alt';
import ReviewActions from 'actions/Review.js';
import VisitsApi from 'services/Visits.js';


class ReviewStore {

  constructor() {
    this.error = null;
    this.bindActions(ReviewActions);
  }

  onReview(review) {
    VisitsApi.review(review);
    return false;
  }

  onError(error) {
    this.error = error;
  }

  onReviewSuccess() {
    this.error = null;
  }

}

export default alt.createStore(ReviewStore, 'ReviewStore');
