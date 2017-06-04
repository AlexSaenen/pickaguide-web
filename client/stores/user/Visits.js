import alt from 'client/alt';
import VisitsActions from 'actions/Visits.js';
import VisitsApi from 'services/Visits.js';


class VisitsStore {

  constructor() {
    this.error = null;
    this.myVisits = null;
    this.theirVisits = null;
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

  onGet() {
    VisitsApi.get();
    return false;
  }

  onGetSuccess(res) {
    this.error = null;
    this.myVisits = res.myVisits.map((visit) => {
      visit.with = visit.about.ownerName;
      return visit;
    });

    this.theirVisits = res.theirVisits.map((visit) => {
      visit.with = visit.byName;
      return visit;
    });
  }

  onCancel(form) {
    VisitsApi.action(form.callerId, 'cancel', { reason: form.reason });
    return false;
  }

  onDeny(form) {
    VisitsApi.action(form.callerId, 'deny', { reason: form.reason });
    return false;
  }

  onAccept(form) {
    VisitsApi.action(form.callerId, 'accept', { reason: form.reason });
    return false;
  }

  onFinish(form) {
    VisitsApi.action(form.callerId, 'finish', { reason: form.reason });
    return false;
  }

  onActionSuccess(newVisit) {
    let mustUpdate = false;

    let index = this.myVisits.findIndex(visit => visit._id === newVisit._id);
    if (index !== -1) {
      this.myVisits[index].status = newVisit.status[newVisit.status.length - 1];
      mustUpdate = true;
    }

    index = this.theirVisits.findIndex(visit => visit._id === newVisit._id);
    if (index !== -1) {
      this.theirVisits[index].status = newVisit.status[newVisit.status.length - 1];
      mustUpdate = true;
    }

    return mustUpdate;
  }

  onInvalidateVisits() {
    this.error = null;
    this.myVisits = null;
    this.theirVisits = null;
  }

}

export default alt.createStore(VisitsStore, 'VisitsStore');
