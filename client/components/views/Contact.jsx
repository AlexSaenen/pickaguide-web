import React from 'react';

import { FormLayout } from 'formFramework/FormLayout.jsx';
import { TextArea } from 'formFramework/TextArea.jsx';
import { TextInput } from 'formFramework/TextInput.jsx';
import { TelInput } from 'formFramework/TelInput.jsx';
import { EmailInput } from 'formFramework/EmailInput.jsx';
import { StoreObserver } from 'base/StoreObserver.jsx';
import ContactActions from 'actions/Contact.js';
import AccountStore from 'stores/Account.js';
import ContactStore from 'stores/Contact.js';


export class Contact extends StoreObserver {

  constructor(props, context) {
    super(props, context, [AccountStore, ContactStore]);

    this.state = {
      account: AccountStore.getState().account,
      isSuccess: null,
      messageTitle: '',
      messageContent: '',
    };

    this.onStoreChange = this.onStoreChange.bind(this);
    this.onContact = this.onContact.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onContact(store) {
    const stateCopy = Object.assign({}, this.state);
    stateCopy.isSuccess = store.error === null;

    if (store.error) {
      stateCopy.messageTitle = 'Some error occurred when contacting us';
      stateCopy.messageContent = String(store.error);
    } else if (store.contactId) {
      stateCopy.messageTitle = 'Successful';
      stateCopy.messageContent =
        `You have successfully contacted us! Your contact id is '${store.contactId}'. One of our staff will answer you soon.`;
    }

    this.updateState(stateCopy);
  }

  onStoreChange(store) {
    const stateCopy = Object.assign({}, this.state);
    stateCopy.account = store.account;
    this.updateState(stateCopy);
  }

  handleSubmit(form) {
    ContactActions.contact(form);
  }

  render() {
    const account = this.state.account;
    const message = {
      title: this.state.messageTitle,
      content: this.state.messageContent,
      type: (this.state.isSuccess ? 'Success' : 'Alert'),
    };

    return (
      <div>
        <FormLayout onSubmit={this.handleSubmit} submitLabel="Contact" message={message}>
          <TextInput label="name" value={(account && account.firstName) ? `${account.firstName} ${account.lastName}` : ''} placeholder="Nom complet" required />
          <EmailInput value={account ? account.email : ''} placeholder="Email" required />
          <TelInput label="phone" value={account ? account.phone : ''} placeholder="Téléphone" />
          <TextArea label="message" placeholder="Entrez votre message" required />
        </FormLayout>
      </div>
    );
  }
}
