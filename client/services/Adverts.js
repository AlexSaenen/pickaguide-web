import AdvertsActions from 'actions/Adverts.js';
import PromiseApi from 'services/PromiseApi.js';

export default class AdvertsApi {

  static create(form) {
    const files = form.pictures[0];
    delete form.pictures;

    PromiseApi.auth().uploads('/proposals', form, files)
      .then((res) => {
        if (res.error) {
          AdvertsActions.error(res.error);
        } else {
          Promise.all(res.adverts.map((advert) => {
            if (advert.photoUrl === '') {
              return PromiseApi.download(`/public/proposals/${advert._id}/image`);
            }

            return advert.photoUrl;
          }))
          .then((images) => {
            images.forEach((image, index) => {
              res.adverts[index].images = [image];
            });

            AdvertsActions.getSuccess(res.adverts);
          });
        }
      })
      .catch((err) => {
        AdvertsActions.error(err);
      });
  }

  static find(advertId) {
    PromiseApi.get(`/public/proposals/${advertId}`)
      .then((res) => {
        if (res.error) {
          AdvertsActions.error(res.error);
        } else {
          if (res.advert.photoUrl === '') {
            PromiseApi.get(`/public/proposals/${advertId}/imageHooks`)
            .then((hooks) => {
              Promise.all(hooks.map(hook => PromiseApi.download(`/public/proposals/${advertId}/image/${hook}`)))
              .then((images) => {
                res.advert.images = images;
                AdvertsActions.findSuccess(res.advert);
              });
            });
          } else {
            res.advert.images = [res.advert.photoUrl];
            AdvertsActions.findSuccess(res.advert);
          }
        }
      })
      .catch((err) => {
        AdvertsActions.error(err);
      });
  }

  static findAll() {
    PromiseApi.get('/public/proposals/')
      .then((res) => {
        if (res.error) {
          AdvertsActions.error(res.error);
        } else {
          Promise.all(res.adverts.map((advert) => {
            if (advert.photoUrl === '') {
              return PromiseApi.download(`/public/proposals/${advert._id}/image`);
            }

            return advert.photoUrl;
          }))
          .then((images) => {
            images.forEach((image, index) => {
              res.adverts[index].images = [image];
            });

            AdvertsActions.getSuccess(res.adverts);
          });
        }
      })
      .catch((err) => {
        AdvertsActions.error(err);
      });
  }

  static findMain() {
    PromiseApi.get('/public/proposals/main')
      .then((res) => {
        if (res.error) {
          AdvertsActions.error(res.error);
        } else {
          Promise.all(res.adverts.map((advert) => {
            if (advert.photoUrl === '') {
              return PromiseApi.download(`/public/proposals/${advert._id}/image`);
            }

            return advert.photoUrl;
          }))
          .then((images) => {
            images.forEach((image, index) => {
              res.adverts[index].images = [image];
            });

            AdvertsActions.getSuccess(res.adverts);
          });
        }
      })
      .catch((err) => {
        AdvertsActions.error(err);
      });
  }

  static getMine() {
    PromiseApi.auth().get('/proposals')
      .then((res) => {
        if (res.error) {
          AdvertsActions.error(res.error);
        } else {
          Promise.all(res.adverts.map((advert) => {
            if (advert.photoUrl === '') {
              return PromiseApi.download(`/public/proposals/${advert._id}/image`);
            }

            return advert.photoUrl;
          }))
          .then((images) => {
            images.forEach((image, index) => {
              res.adverts[index].images = [image];
            });

            AdvertsActions.getSuccess(res.adverts);
          });
        }
      })
      .catch((err) => {
        AdvertsActions.error(err);
      });
  }

  static getFrom(userId) {
    PromiseApi.auth().get(`/public/users/${userId}/proposals`)
      .then((res) => {
        if (res.error) {
          AdvertsActions.error(res.error);
        } else {
          Promise.all(res.adverts.map((advert) => {
            if (advert.photoUrl === '') {
              return PromiseApi.download(`/public/proposals/${advert._id}/image`);
            }

            return advert.photoUrl;
          }))
          .then((images) => {
            images.forEach((image, index) => {
              res.adverts[index].images = [image];
            });

            AdvertsActions.getSuccess(res.adverts);
          });
        }
      })
      .catch((err) => {
        AdvertsActions.error(err);
      });
  }

  static update(advert) {
    PromiseApi.auth().put(`/proposals/${advert._id}`, advert)
      .then((res) => {
        if (res.error) {
          AdvertsActions.error(res.error);
        } else {
          if (res.advert.photoUrl === '') {
            PromiseApi.download(`/public/proposals/${advert._id}/image`)
            .then((image) => {
              res.advert.images = [image];
              AdvertsActions.updateSuccess(res.advert);
            });
          } else {
            res.advert.images = [res.advert.photoUrl];
            AdvertsActions.updateSuccess(res.advert);
          }
        }
      })
      .catch((err) => {
        AdvertsActions.error(err);
      });
  }

  static toggle(advertId) {
    PromiseApi.auth().put(`/proposals/${advertId}/toggle`)
      .then((res) => {
        if (res.error) {
          AdvertsActions.error(res.error);
        } else {
          Promise.all(res.adverts.map((advert) => {
            if (advert.photoUrl === '') {
              return PromiseApi.download(`/public/proposals/${advert._id}/image`);
            }

            return advert.photoUrl;
          }))
          .then((images) => {
            images.forEach((image, index) => {
              res.adverts[index].images = [image];
            });

            AdvertsActions.getSuccess(res.adverts);
          });
        }
      })
      .catch((err) => {
        AdvertsActions.error(err);
      });
  }

  static remove(advertId) {
    PromiseApi.auth().delete(`/proposals/${advertId}`)
      .then((res) => {
        if (res.error) {
          AdvertsActions.error(res.error);
        } else {
          Promise.all(res.adverts.map((advert) => {
            if (advert.photoUrl === '') {
              return PromiseApi.download(`/public/proposals/${advert._id}/image`);
            }

            return advert.photoUrl;
          }))
          .then((images) => {
            images.forEach((image, index) => {
              res.adverts[index].images = [image];
            });

            AdvertsActions.getSuccess(res.adverts);
          });
        }
      })
      .catch((err) => {
        AdvertsActions.error(err);
      });
  }

}
