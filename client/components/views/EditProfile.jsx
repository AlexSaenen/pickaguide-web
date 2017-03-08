import React from 'react';

import { PanelForm } from 'view/PanelForm.jsx';
import { TextInput } from 'form/TextInput.jsx';
import { TextArea } from 'form/TextArea.jsx';
import { StoreObserver } from 'base/StoreObserver.jsx';
import { Title } from 'layout/Title.jsx';
import { EditPicture } from 'layout/user/EditPicture.jsx';
import NewPicture from 'modals/NewPicture.jsx';
import ProfileActions from 'actions/Profile.js';
import ProfileStore from 'stores/Profile.js';


export class EditProfile extends StoreObserver {

  constructor(props, context) {
    super(props, context, ProfileStore);

    this.state = {
      profile: ProfileStore.getState().profile,
      isSuccess: null,
      messageTitle: '',
      messageContent: '',
    };

    this.onStoreChange = this.onStoreChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmitPicture = this.handleSubmitPicture.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  onStoreChange(store) {
    const stateCopy = Object.assign({}, this.state);
    stateCopy.profile = store.profile;

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
    // maybe check if a value is empty => profileSettingsValidationError(form.firstName'value empty');
    ProfileActions.update(form);
  }

  handleSubmitPicture(form) {
    ProfileActions.update({ photoUrl: form.photoUrl });
  }

  toggleModal() {
    const stateCopy = Object.assign({}, this.state);
    stateCopy.editActive = !this.state.editActive;
    this.updateState(stateCopy);
  }

  render() {
    const profile = this.state.profile || {};
    const message = {
      title: this.state.messageTitle,
      content: this.state.messageContent,
      type: '',
    };

    if (this.state.isSuccess !== null) {
      message.type = (this.state.isSuccess ? 'Success' : 'Alert');
    }

    console.log('EditProfile.render()', message);

    return (
      <div>
        <PanelForm onSubmit={this.handleSubmit} submitLabel="Save" message={message}>
          <Title>Update your profile</Title>

          <hr className="Overlay" />

          <TextInput value={profile.firstName} label="firstName" placeholder="First name" required />
          <TextInput value={profile.lastName} label="lastName" placeholder="Last name" required />

          <hr className="Divider" />

          <TextInput value={profile.phone} label="phone" />
          <TextInput value={profile.city} label="city" />
          <TextInput value={profile.country} label="country" />
          <TextArea value={profile.description} label="description" />
          <TextArea value={profile.interests[0]} label="interests" />

          <EditPicture url={profile.photoUrl} onClick={this.toggleModal} />
        </PanelForm>

        <NewPicture
          active={this.state.editActive}
          onClose={this.toggleModal}
          onSubmit={this.handleSubmitPicture}
          inputLabel="photoUrl"
        />
      </div>
    );
  }
}
