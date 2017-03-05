import React from 'react';

import { PanelFormLayout } from 'layouts/PanelFormLayout.jsx';
import { TextInput } from 'formFramework/TextInput.jsx';
import { TextArea } from 'formFramework/TextArea.jsx';
import { StoreObserver } from 'base/StoreObserver.jsx';
import { Title } from 'layoutFramework/Title.jsx';

import { Modal } from 'layoutFramework/Modal.jsx';
import { FormLayout } from 'layouts/FormLayout.jsx';
import { EmailInput } from 'formFramework/EmailInput.jsx';
import { PasswordInput } from 'formFramework/PasswordInput.jsx';

// import { Picture } from 'layoutFramework/Picture.jsx';
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

  // <div style={{ height: '10em' }}>
  //   <Picture pictureName="Photo URL" url={profile.photoUrl} />
  // </div>

  render() {
    const profile = this.state.profile || {};
    const message = {
      title: this.state.messageTitle,
      content: this.state.messageContent,
      type: (this.state.isSuccess ? 'Success' : 'Alert'),
    };

    return (
      <div>
        <PanelFormLayout onSubmit={this.handleSubmit} submitLabel="Save" message={message}>
          <Title>Update your profile</Title>

          <hr className="Overlay" />

          <TextInput value={profile.firstName} label="firstName" placeholder="First name" />
          <TextInput value={profile.lastName} label="lastName" placeholder="Last name" />

          <hr className="Divider" />

          <TextInput value={profile.phone} label="phone" />
          <TextInput value={profile.city} label="city" />
          <TextInput value={profile.country} label="country" />
          <TextArea value={profile.description} label="description" required />
          <TextArea value={profile.interests} label="interests" required />

          <hr className="Divider" />

          <TextArea value={profile.photoUrl} label="photoUrl" placeholder="Photo URL" required />
        </PanelFormLayout>

        <Modal active>
          <FormLayout layoutStyle="LayoutDark Tight">
            <Title>Login</Title>
            <EmailInput required />
            <PasswordInput required />
          </FormLayout>
        </Modal>
      </div>
    );
  }
}
