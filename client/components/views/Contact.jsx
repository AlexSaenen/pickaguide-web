import React from 'react';

import { PanelForm } from 'view/PanelForm.jsx';
import { TextArea } from 'form/TextArea.jsx';
import { TextInput } from 'form/TextInput.jsx';
import { TelInput } from 'form/TelInput.jsx';
import { EmailInput } from 'form/EmailInput.jsx';
import { StoreObserver } from 'base/StoreObserver.jsx';
import { Title } from 'layout/Title.jsx';
import ContactActions from 'actions/Contact.js';
import AccountStore from 'stores/Account.js';
import ProfileStore from 'stores/Profile.js';
import ContactStore from 'stores/Contact.js';


export class Contact extends StoreObserver {

  constructor(props, context) {
    super(props, context, [AccountStore, ProfileStore, ContactStore]);

    this.state = {
      account: AccountStore.getState().account,
      profile: ProfileStore.getState().profile,
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

    if (store.account) {
      stateCopy.account = store.account;
    } else if (store.profile) {
      stateCopy.profile = store.profile;
    }

    this.updateState(stateCopy);
  }

  handleSubmit(form) {
    ContactActions.contact(form);
  }

  render() {
    const account = this.state.account;
    const profile = this.state.profile;
    const message = {
      title: this.state.messageTitle,
      content: this.state.messageContent,
      type: (this.state.isSuccess ? 'Success' : 'Alert'),
    };

    return (
      <PanelForm onSubmit={this.handleSubmit} submitLabel="Contact" message={message}>
        <Title>Contact Us</Title>
        <hr className="Overlay" />
        <TextInput label="name" value={profile ? `${profile.firstName} ${profile.lastName}` : ''} placeholder="Full name" required />
        <EmailInput value={account ? account.email : ''} required />
        <TelInput label="phone" value={profile ? profile.phone : ''} />
        <TextArea label="message" required />
      </PanelForm>
    );
  }
}
