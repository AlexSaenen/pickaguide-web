import BookActions from 'actions/Book.js';
import PromiseApi from 'services/PromiseApi.js';


export default class BooksApi {

  static get() {
    PromiseApi.auth().get('/travelbook')
      .then((res) => {
        if (res.error) {
          BookActions.error(res.error);
        } else {
          BookActions.getSuccess(res);
        }
      })
      .catch((err) => {
        BookActions.error(err);
      });
  }

  static find(visitId) {
    PromiseApi.auth().get(`/visits/${visitId}/visitor`)
      .then((res) => {
        if (res.error) {
          BookActions.error(res.error);
        } else {
          PromiseApi.auth().get(`/travelbook/${visitId}/imageHooks`)
          .then((hooks) => {
            Promise.all(hooks.map(hook => PromiseApi.auth().download(`/travelbook/${visitId}/image/${hook}`)))
            .then((images) => {
              res.visit.images = images;
              BookActions.findSuccess(res.visit);
            });
          });
        }
      })
      .catch((err) => {
        BookActions.error(err);
      });
  }

  static update(form) {
    const files = form.pictures;
    delete form.pictures;

    PromiseApi.auth().uploads(`/travelbook/${form._id}`, form, files, 'PUT')
      .then((res) => {
        if (res.error) {
          BookActions.error(res.error);
        } else {
          BookActions.updateSuccess();
        }
      })
      .catch((err) => {
        BookActions.error(err);
      });
  }

}
