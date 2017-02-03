import React from 'react';

import { BasicForm } from 'formFramework/BasicForm.jsx';
import { TextInput } from 'formFramework/TextInput.jsx';
import { StoreObserver } from 'base/StoreObserver.jsx';
import ProfileActions from 'actions/Profile.js';
import ProfileStore from 'stores/Profile.js';


export class SettingsProfile extends StoreObserver {

  constructor(props, context) {
    super(props, context, ProfileStore);

    this.router = context.router;
    console.log('***', ProfileStore.getState().profile);
    this.state = {
      profile: ProfileStore.getState().profile,
    };

    this.onStoreChange = this.onStoreChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onStoreChange() {
    const stateCopy = Object.assign({}, this.state);
    stateCopy.profile = ProfileStore.getState().profile;
    console.log(stateCopy.profile);
    this.updateState(stateCopy);
  }

  handleSubmit(form) {
    console.log(form);
    ProfileActions.update(form);
    // <TextInput value={this.state.prfole.firstName} label="firstName" placeholder="Entrez votre prénom" />
    // <TextInput value={this.state.prfole.lastName} label="lastName" placeholder="Entrez votre nom" />
    // <TextInput value={this.state.prfole.phone} label="phone" placeholder="Entrez votre téléphone" />
    // <TextInput value={this.state.prfole.city} label="city" placeholder="Entrez votre ville" />
    // <TextInput value={this.state.prfole.country} label="country" placeholder="Entrez votre pays" />
    // <TextInput value={this.state.prfole.photo} label="photo" placeholder="Entrez votre photo" />
  }

  // TODO: Alex: Insert a title for Settings, make sure to create the element for that

  render() {
    return (
      <div>
        <BasicForm onSubmit={this.handleSubmit} submitLabel="Save">
          <h1>Update your profile</h1>
          <TextInput label="firstName" placeholder="Entrez votre prénom" />
          <TextInput label="lastName" placeholder="Entrez votre nom" />
          <TextInput label="phone" placeholder="Entrez votre téléphone" />
          <TextInput label="phone" placeholder="Entrez votre téléphone" />
          <TextInput label="city" placeholder="Entrez votre ville" />
          <TextInput label="country" placeholder="Entrez votre pays" />
          <TextInput label="photo" placeholder="Entrez votre photo" />
        </BasicForm>
      </div>
    );
  }
}
