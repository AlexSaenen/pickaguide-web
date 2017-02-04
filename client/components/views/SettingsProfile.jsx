import React from 'react';

import { BasicForm } from 'formFramework/BasicForm.jsx';
import { TextInput } from 'formFramework/TextInput.jsx';
import { TextArea } from 'formFramework/TextArea.jsx';
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
      isSuccess: null,
      messageTitle: '',
      messageContent: '',
    };

    this.onStoreChange = this.onStoreChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onStoreChange(store) {
    const stateCopy = Object.assign({}, this.state);
    stateCopy.profile = store.profile;
    console.log('onStoreChange Profile:', stateCopy.profile, '|', store);

    if (store.error) {
      stateCopy.messageTitle = 'Some error occurred when updating your profile';
      stateCopy.messageContent = String(store.error);
      stateCopy.isSuccess = false;
    } else {
      stateCopy.messageTitle = 'Successful';
      stateCopy.messageContent = 'Your informations have been updated';
      stateCopy.isSuccess = true;
    }
    this.updateState(stateCopy);
  }

  handleSubmit(form) {
    console.log(form);
    // maybe check if a value is empty => profileSettingsValidationError(form.firstName'value empty');
    ProfileActions.update(form);
  }

  render() {
    const profile = this.state.profile || {};
    const message = {
      title: this.state.messageTitle,
      content: this.state.messageContent,
      type: (this.state.isSuccess ? 'Success' : 'Alert'),
    };

    return (
      <div>
        <BasicForm onSubmit={this.handleSubmit} submitLabel="Save" message={message}>
          <h1>Update your profile</h1>
          <TextInput value={profile.firstName} label="firstName" placeholder="Entrez votre prénom" />
          <TextInput value={profile.lastName} label="lastName" placeholder="Entrez votre nom" />
          <TextInput value={profile.phone} label="phone" placeholder="Entrez votre téléphone" />
          <TextInput value={profile.city} label="city" placeholder="Entrez votre ville" />
          <TextInput value={profile.country} label="country" placeholder="Entrez votre pays" />
          <TextArea value={profile.description} label="description" placeholder="Entrez votre description" required />
          <TextArea value={profile.photoUrl} label="photo" placeholder="Entrez votre photo" required />
        </BasicForm>
      </div>
    );
  }
}
