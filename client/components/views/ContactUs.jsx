import React from 'react';

import { BasicForm } from '../formFramework/BasicForm.jsx';
import { TextArea } from '../formFramework/TextArea.jsx';
import { TextInput } from '../formFramework/TextInput.jsx';
import { TelInput } from '../formFramework/TelInput.jsx';
import { EmailInput } from '../formFramework/EmailInput.jsx';
import ContactActions from '../../actions/ContactUs.js';
import ProfileStore from '../../stores/Profile.js';
const _ = require('lodash');

import 'scss/components/_home.scss';

export class ContactUs extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = { profile: ProfileStore.getState().profile };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    ProfileStore.listen(this.onChange);
    ContactActions.requestContactUs();
  }

  componentWillUnmount() {
    ProfileStore.unlisten(this.onChange);
  }

  onChange() {
    const stateCopy = Object.assign({}, this.state);
    stateCopy.profile = ProfileStore.getState().profile;
    if (_.isEqual(stateCopy, this.state) === false) {
      this.setState(stateCopy);
    }
  }

  handleSubmit(form) {
    console.log(form);
  }

  render() {
    const profile = this.state.profile || {};

    // TODO: Alex: Insert a title for Contact Us, make sure to create the element for that

    return (
      <div>
        <BasicForm onSubmit={this.handleSubmit} submitLabel="Contact">
          <TextInput
            label="name"
            value={this.state.userConnected ? `${profile.message.prenom} ${profile.message.nom}` : ''}
            placeholder="Nom complet"
            required
          />
          <EmailInput
            value={this.state.userConnected ? profile.message.email : ''}
            placeholder="Email"
            required
          />
          <TelInput label="phone" placeholder="Téléphone" />
          <TextArea label="message" placeholder="Entrez votre message" required />
        </BasicForm>
      </div>
    );
  }
}
