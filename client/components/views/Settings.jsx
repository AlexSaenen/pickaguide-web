import React from 'react';

import { BasicForm } from '../formFramework/BasicForm.jsx';
import { TextInput } from '../formFramework/TextInput.jsx';
import { PasswordInput } from '../formFramework/PasswordInput.jsx';
import { TelInput } from '../formFramework/TelInput.jsx';
import { EmailInput } from '../formFramework/EmailInput.jsx';
// import SettingsActions from '../../actions/Settings.js';
import ProfileStore from '../../stores/Profile.js';
const _ = require('lodash');

export class Settings extends React.Component {
  constructor(props, context) {
    super(props, context);


    this.router = context.router;
    this.state = {
      profile: {},
    };

    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    ProfileStore.listen(this.onChange);
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

  // TODO: Alex: Insert a title for Settings, make sure to create the element for that

  render() {
    return (
      <div>
        <BasicForm onSubmit={this.handleSubmit} submitLabel="Save">
          <TextInput label="firstName" placeholder="Entrez votre prénom" />
          <TextInput label="lastName" placeholder="Entrez votre nom" />
          <EmailInput placeholder="Entrez votre email" />
          <PasswordInput placeholder="Entrez votre mot de passe" />
          <PasswordInput label="passwordConfirmation" placeholder="Confirmez votre mot de passe" />
          <TelInput label="phone" placeholder="Téléphone" />
          <TextInput label="city" placeholder="Ville" />
          <TextInput label="hobbies" placeholder="Hobbies" />
        </BasicForm>
      </div>
    );
  }
}
