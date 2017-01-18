import alt from '../alt';

import ContactActions from '../actions/Contact.js';
import ContactApi from '../services/Contact.js';

class ContactStore {
  constructor() {
    this.error = null;
    this.contactId = null;
    this.bindActions(ContactActions);
  }

  onContact(form) {
    ContactApi.contact(form);
  }

  onContactSuccess(contactId) {
    this.error = null;
    this.contactId = contactId;
  }

  onContactError(error) {
    this.error = error;
    this.contactId = null;
  }
}

export default alt.createStore(ContactStore, 'ContactStore');
