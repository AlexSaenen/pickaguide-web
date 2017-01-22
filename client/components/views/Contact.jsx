import React from 'react';

import { BasicForm } from '../formFramework/BasicForm.jsx';
import { TextArea } from '../formFramework/TextArea.jsx';
import { TextInput } from '../formFramework/TextInput.jsx';
import { TelInput } from '../formFramework/TelInput.jsx';
import { EmailInput } from '../formFramework/EmailInput.jsx';
import ContactActions from '../../actions/Contact.js';
import ProfileStore from '../../stores/Profile.js';
import ContactStore from '../../stores/Contact.js';
const _ = require('lodash');

export class Contact extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      profile: ProfileStore.getState().profile,
      isSuccess: null,
      messageTitle: '',
      messageContent: '',
    };

    this.onChange = this.onChange.bind(this);
    this.onContact = this.onContact.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    ProfileStore.listen(this.onChange);
    ContactStore.listen(this.onContact);
  }

  componentWillUnmount() {
    ProfileStore.unlisten(this.onChange);
    ContactStore.unlisten(this.onContact);
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

    if (_.isEqual(stateCopy, this.state) === false) {
      this.setState(stateCopy);
    }
  }

  onChange(store) {
    const stateCopy = Object.assign({}, this.state);
    stateCopy.profile = store.profile;
    if (_.isEqual(stateCopy, this.state) === false) {
      this.setState(stateCopy);
    }
  }

  handleSubmit(form) {
    ContactActions.contact(form);
  }

  render() {
    const profile = this.state.profile;
    const message = {
      title: this.state.messageTitle,
      content: this.state.messageContent,
      type: (this.state.isSuccess ? 'Success' : 'Alert'),
    };

    return (
      <div>
        <BasicForm onSubmit={this.handleSubmit} submitLabel="Contact" message={message}>
          <TextInput label="name" value={profile ? `${profile.firstName} ${profile.lastName}` : ''} placeholder="Nom complet" required />
          <EmailInput value={profile ? profile.email : ''} placeholder="Email" required />
          <TelInput label="phone" value={profile ? profile.phone : ''} placeholder="Téléphone" />
          <TextArea label="message" placeholder="Entrez votre message" required />
        </BasicForm>
      </div>
    );
  }
}
