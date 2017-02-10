import ContactActions from 'actions/Contact.js';
import PromiseApi from 'services/PromiseApi.js';


export default class ContactApi {

  static contact(form) {
    PromiseApi.post('/public/contact-us', form)
      .then((res) => {
        ContactActions.contactSuccess(res.id);
      })
      .catch((err) => {
        ContactActions.contactError(err);
      });
  }
}
