import React from 'react';

import { PanelForm } from 'view/PanelForm.jsx';
import { TextInput } from 'form/TextInput.jsx';
import { TextArea } from 'form/TextArea.jsx';
import { StoreObserver } from 'base/StoreObserver.jsx';
import { Title } from 'layout/Title.jsx';
import { ClickablePicture } from 'layout/user/ClickablePicture.jsx';
import { EditPicture } from 'modals/EditPicture.jsx';
import ProfileActions from 'actions/Profile.js';
import ProfileStore from 'stores/Profile.js';


export class EditProfile extends StoreObserver {

  constructor(props, context) {
    super(props, context, ProfileStore);

    this.state = {
      profile: ProfileStore.getState().profile,
      modalState: false,
    };

    this.onStoreChange = this.onStoreChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.messageCallback = () => {};
    this.toggleModal = this.toggleModal.bind(this);
  }

  onStoreChange(store) {
    const stateCopy = Object.assign({}, this.state);
    stateCopy.profile = store.profile;

    if (store.error) {
      this.messageCallback({
        title: 'Some error occurred when updating your profile',
        content: String(store.error),
        type: 'Alert',
      });
    } else {
      this.messageCallback({
        title: 'Successful',
        content: 'Your informations have been updated',
        type: 'Success',
      });
    }

    this.updateState(stateCopy);
  }

  handleSubmit(form, submitName, messageCallback) {
    this.messageCallback = messageCallback;
    ProfileActions.update(form);
  }

  toggleModal() {
    const stateCopy = Object.assign({}, this.state);
    stateCopy.modalState = !this.state.modalState;

    // if (stateCopy.modalState) {
    //   ProfileStore.unlisten(this.onStoreChange);
    // } else {
    //   ProfileStore.listen(this.onStoreChange);
    //   stateCopy.profile = ProfileStore.getState().profile;
    // }

    this.updateState(stateCopy);
  }

  render() {
    const profile = this.state.profile || {};
    console.log('EditProfile.render()', this.state.modalState);

    return (
      <div>
        <PanelForm onSubmit={this.handleSubmit} submitLabel="Save">
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

          <ClickablePicture url={profile.photoUrl} onClick={this.toggleModal} />
        </PanelForm>

        <EditPicture
          active={this.state.modalState}
          onClose={this.toggleModal}
        />
      </div>
    );
  }
}
