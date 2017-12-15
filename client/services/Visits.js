import { browserHistory } from 'react-router';

import VisitsActions from 'actions/Visits.js';
import BlockActions from 'actions/Block.js';
import ReviewActions from 'actions/Review.js';
import PromiseApi from 'services/PromiseApi.js';


const findImagesForVisits = (visits) => {
  return new Promise((resolve) => {
    Promise.all(visits.map((visit) => {
      if (visit.about && visit.about.photoUrl === '') {
        return PromiseApi.download(`/public/proposals/${visit.about._id}/image`);
      } else if (visit.about) {
        return Promise.resolve(visit.about.photoUrl);
      }

      return Promise.resolve('');
    }))
    .then((images) => {
      images.forEach((image, index) => {
        if (visits[index].about) {
          visits[index].about.images = [image];
        }
      });

      resolve();
    });
  });
};


export default class VisitsApi {

  static visit(advertId, form) {
    PromiseApi.auth().post(`/proposals/${advertId}/visit`, form)
      .then((res) => {
        if (res.error) {
          VisitsActions.error(res.error);
        } else {
          VisitsActions.visitSuccess();
        }
      })
      .catch((err) => {
        VisitsActions.error(err);
      });
  }

  static get() {
    PromiseApi.auth().get('/visits')
      .then((res) => {
        if (res.error) {
          VisitsActions.error(res.error);
        } else {
          findImagesForVisits(res.myVisits)
          .then(() => findImagesForVisits(res.theirVisits))
          .then(() => VisitsActions.getSuccess(res));
        }
      })
      .catch((err) => {
        VisitsActions.error(err);
      });
  }

  static getUnreviewed() {
    PromiseApi.auth().get('/visits/review')
      .then((res) => {
        if (res.error) {
          VisitsActions.error(res.error);
        } else {
          findImagesForVisits(res.myVisits)
          .then(() => findImagesForVisits(res.theirVisits))
          .then(() => VisitsActions.getSuccess(res));
        }
      })
      .catch((err) => {
        VisitsActions.error(err);
      });
  }

  static findMine(visitId, type) {
    PromiseApi.auth().get(`/visits/${visitId}/${type}`)
      .then((res) => {
        if (res.error) {
          VisitsActions.error(res.error);
        } else {
          if (res.visit.about && res.visit.about.photoUrl === '') {
            PromiseApi.get(`/public/proposals/${res.visit.about._id}/imageHooks`)
            .then((hooks) => {
              Promise.all(hooks.map(hook => PromiseApi.download(`/public/proposals/${res.visit.about._id}/image/${hook}`)))
              .then((images) => {
                res.visit.about.images = images;
                VisitsActions.findSuccess(res.visit);
              });
            });
          } else if (res.visit.about) {
            res.visit.about.images = [res.visit.about.photoUrl];
          }
        }
      })
      .catch((err) => {
        VisitsActions.error(err);
      });
  }

  static find(visitId) {
    PromiseApi.get(`/public/visits/${visitId}`)
      .then((res) => {
        if (res.error) {
          VisitsActions.error(res.error);
        } else {
          if (res.visit.about && res.visit.about.photoUrl === '') {
            PromiseApi.get(`/public/proposals/${res.visit.about._id}/imageHooks`)
            .then((hooks) => {
              Promise.all(hooks.map(hook => PromiseApi.download(`/public/proposals/${res.visit.about._id}/image/${hook}`)))
              .then((images) => {
                res.visit.about.images = images;
                VisitsActions.findSuccess(res.visit);
              });
            });
          } else if (res.visit.about) {
            res.visit.about.images = [res.visit.about.photoUrl];
          }
        }
      })
      .catch((err) => {
        VisitsActions.error(err);
      });
  }

  static action(visitId, type, form) {
    PromiseApi.auth().put(`/visits/${visitId}/${type}`, form)
      .then((res) => {
        if (res.error) {
          VisitsActions.error(res.error);
        } else {
          VisitsActions.actionSuccess(res.visit);
          if (type === 'finish') {
            browserHistory.push('/visits/review');
            BlockActions.isBlocking.defer();
          }
        }
      })
      .catch((err) => {
        VisitsActions.error(err);
      });
  }

  static review(form) {
    PromiseApi.auth().put(`/visits/${form.visitId}/review`, { for: form.for, rate: form.rate })
      .then((res) => {
        if (res.error) {
          ReviewActions.error(res.error);
        } else {
          findImagesForVisits(res.myVisits)
          .then(() => VisitsActions.getSuccess.defer(res));

          if (res.myVisits.length === 0 && res.theirVisits.length === 0) {
            BlockActions.isBlocking.defer();
          }

          ReviewActions.reviewSuccess.defer();
        }
      })
      .catch((err) => {
        ReviewActions.error(err);
      });
  }

}
