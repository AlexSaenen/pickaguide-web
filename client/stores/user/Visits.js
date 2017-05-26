import alt from 'client/alt';
import VisitsActions from 'actions/Visits.js';
import VisitsApi from 'services/Visits.js';


class VisitsStore {

  constructor() {
    this.error = null;
    this.bindActions(VisitsActions);
  }

  onVisit(visitObj) {
    const form = visitObj;
    const advertId = form.advertId;
    delete form.advertId;
    VisitsApi.visit(advertId, form);
    return false;
  }

  onVisitSuccess() {
    this.error = null;
  }

  onError(error) {
    this.error = error;
  }

}

export default alt.createStore(VisitsStore, 'VisitsStore');
