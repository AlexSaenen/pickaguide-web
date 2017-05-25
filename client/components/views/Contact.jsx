import React from 'react';

import { PanelForm } from 'view/PanelForm.jsx';
import { TextArea } from 'form/TextArea.jsx';
import { TextInput } from 'form/TextInput.jsx';
import { TelInput } from 'form/TelInput.jsx';
import { EmailInput } from 'form/EmailInput.jsx';
import { StoreObserver } from 'base/StoreObserver.jsx';
import { Title } from 'layout/elements/Title.jsx';
import ContactActions from 'actions/Contact.js';
import AccountStore from 'stores/user/Account.js';
import ProfileStore from 'stores/user/Profile.js';
import ContactStore from 'stores/user/Contact.js';
import LocalizedStrings from 'react-localization';
import Languages from './languages.js';

// let string = new LocalizedStrings(Languages);
 
let strings = new LocalizedStrings({
 en:{
   contact_us:"Contact Us",
   contact:"Contact",
   name:"name",
   fname:"Full name",
   phone:"Phone",
   message:"Message",
   submit:"Contact"
 },
 fr: {
   contact_us:"Contactez nous",
   contact:"Contact",
   name:"Nom",
   fname:"Nom complet",
   phone:"Téléphonne",
   message:"Message",
   submit:"Envoyer"
 }
});


export class Contact extends StoreObserver {

  constructor(props, context) {
    super(props, context, [AccountStore, ProfileStore, ContactStore]);

    this.state = {
      account: AccountStore.getState().account,
      profile: ProfileStore.getState().profile,
    };

    this.onStoreChange = this.onStoreChange.bind(this);
    this.onContact = this.onContact.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.messageCallback = () => {};
  }

  onContact(store) {
    const stateCopy = Object.assign({}, this.state);

    if (store.error) {
      this.messageCallback({
        title: 'Some error occurred when contacting us',
        content: String(store.error),
        type: 'Alert',
      });
    } else {
      this.messageCallback({
        title: 'Successful',
        content: `You have successfully contacted us! Your contact id is '${store.contactId}'. One of our staff will answer you soon.`,
        type: 'Success',
      });
    }

    this.setState(stateCopy);
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
        <TextInput label={strings.name} value={profile ? `${profile.firstName} ${profile.lastName}` : ''} placeholder={strings.fname} required />
        <EmailInput value={account ? account.email : ''} required />
        <TelInput label={strings.phone} value={profile ? profile.phone : ''} />
        <TextArea label={strings.message} required />
      </PanelForm>
    );
  }
}
