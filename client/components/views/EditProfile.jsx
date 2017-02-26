import React from 'react';

import { FormLayout } from 'formFramework/FormLayout.jsx';
import { TextInput } from 'formFramework/TextInput.jsx';
import { TextArea } from 'formFramework/TextArea.jsx';
import { StoreObserver } from 'base/StoreObserver.jsx';
import { Title } from 'base/Title.jsx';
import ProfileActions from 'actions/Profile.js';
import ProfileStore from 'stores/Profile.js';


export class EditProfile extends StoreObserver {

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
        <FormLayout onSubmit={this.handleSubmit} submitLabel="Save" message={message}>
          <Title>Update your profile</Title>
          <hr className="Overlay" />
          <TextInput value={profile.firstName} label="firstName" placeholder="First name" />
          <TextInput value={profile.lastName} label="lastName" placeholder="Last name" />
          <hr className="Divider" />
          <TextInput value={profile.phone} label="phone" />
          <TextInput value={profile.city} label="city" />
          <TextInput value={profile.country} label="country" />
          <TextArea value={profile.description} label="description" required />
          <hr className="Divider" />
          <TextArea value={profile.photoUrl} label="photoUrl" placeholder="Photo URL" required />
        </FormLayout>
      </div>
    );
  }
}
