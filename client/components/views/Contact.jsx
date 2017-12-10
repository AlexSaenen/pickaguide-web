import React from 'react';

import { PanelForm } from 'view/PanelForm.jsx';
import { TextArea } from 'form/TextArea.jsx';
import { TextInput } from 'form/TextInput.jsx';
import { TelInput } from 'form/TelInput.jsx';
import { EmailInput } from 'form/EmailInput.jsx';
import { StoreObserver } from 'base/StoreObserver.jsx';
import { Title } from 'layout/elements/Title.jsx';
import { strings } from './Contact_lang.js';
import ContactActions from 'actions/Contact.js';
import AccountStore from 'stores/user/Account.js';
import ProfileStore from 'stores/user/Profile.js';
import ContactStore from 'stores/user/Contact.js';

export class Contact extends StoreObserver {

  constructor(props, context) {
    super(props, context, [AccountStore, ProfileStore, ContactStore]);

    this.state = {
      account: AccountStore.getState().account,
      profile: ProfileStore.getState().profile,
    };

    this.onStore = this.onStore.bind(this);
    this.onContact = this.onContact.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.messageCallback = () => {};
  }

  onContact(store) {
    const newState = Object.assign({}, this.state);

    if (store.error) {
      this.messageCallback({
        title: String(strings.error),
        content: String(store.error),
        type: 'Alert',
      });
    } else {
      this.messageCallback({
        title: String(strings.success),
        content: String(strings.success_content),
        type: 'Success',
      });
    }

    this.setState(newState);
  }

  onStore(store) {
    const newState = Object.assign({}, this.state);

    if (store.account) {
      newState.account = store.account;
    } else if (store.profile) {
      newState.profile = store.profile;
    }

    this.updateState(newState);
  }

  handleSubmit(form, submitName, messageCallback) {
    this.messageCallback = messageCallback;
    ContactActions.contact(form);
  }

  render() {
    const account = this.state.account;
    const profile = this.state.profile;

    return (
      <PanelForm onSubmit={this.handleSubmit} submitLabel={strings.submit}>
        <Title>{strings.contact_us}</Title>
        <hr className="SpacedOverlay" />
        <TextInput label="name" value={profile ? `${profile.firstName} ${profile.lastName}` : ''} placeholder={strings.fname} required />
        <EmailInput value={account ? account.email : ''} required />
        <TelInput label="phone" value={profile ? profile.phone : ''} placeholder={strings.phone} />
        <TextArea label="message" required />
      </PanelForm>
    );
  }
}
