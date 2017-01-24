import ContactActions from '../actions/Contact.js';
import PromiseApi from './PromiseApi.js';

export default class ContactApi {
  static contact(form) {
    PromiseApi.post('/public/contactus', form)
      .then((result) => {
        if (result.error) {
          ContactActions.contactError(result.error);
        } else {
          ContactActions.contactSuccess(result.id);
        }
      })
      .catch((err) => {
        ContactActions.contactError(err);
      });
  }
}
