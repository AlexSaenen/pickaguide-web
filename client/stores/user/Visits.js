import alt from 'client/alt';
import VisitsActions from 'actions/Visits.js';
import VisitsApi from 'services/Visits.js';


class VisitsStore {

  constructor() {
    this.error = null;
    this.myVisits = [];
    this.theirVisits = [];
    this.specificVisit = null;
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

  onGetUnreviewed() {
    VisitsApi.getUnreviewed();
    return false;
  }

  onFind(who) {
    if (who.mine) {
      VisitsApi.findMine(who.visitId, who.type);
    } else {
      VisitsApi.find(who.visitId);
    }
    return false;
  }

  onGetSuccess(res) {
    this.error = null;

    this.myVisits = res.myVisits.map((visit) => {
      visit.with = visit.about ? visit.about.ownerName : 'Unknown';
      visit.finalStatus = visit.status[visit.status.length - 1];
      return visit;
    });

    this.theirVisits = res.theirVisits.map((visit) => {
      visit.with = visit.byName;
      visit.finalStatus = visit.status[visit.status.length - 1];
      return visit;
    });
  }

  onFindSuccess(visit) {
    this.specificVisit = visit;
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

    if (this.specificVisit && this.specificVisit._id === newVisit._id) {
      this.specificVisit.status = newVisit.status;
      mustUpdate = true;
    }

    return mustUpdate;
  }

  onInvalidateVisits() {
    this.error = null;
    this.myVisits = [];
    this.theirVisits = [];
    this.specificVisit = null;
  }

}

export default alt.createStore(VisitsStore, 'VisitsStore');
