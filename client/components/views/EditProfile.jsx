import React from 'react';

import { PanelForm } from 'view/PanelForm.jsx';
import { TextInput } from 'form/TextInput.jsx';
import { DateInput, nowToInput } from 'form/DateInput.jsx';
import { TextArea } from 'form/TextArea.jsx';
import { StoreObserver } from 'base/StoreObserver.jsx';
import { FormController } from 'base/FormController.jsx';
import { ModalFormController } from 'base/ModalFormController.jsx';
import { Title } from 'layout/elements/Title.jsx';
import { ClickablePicture } from 'layout/user/ClickablePicture.jsx';
import { EditableInterests } from 'layout/user/EditableInterests.jsx';
import { EditPicture } from 'modals/EditPicture.jsx';
import ProfileActions from 'actions/Profile.js';
import ProfileStore from 'stores/user/Profile.js';
import AvatarStore from 'stores/user/Avatar.js';


export class EditProfile extends StoreObserver {

  constructor(props, context) {
    super(props, context, [ProfileStore, AvatarStore]);

    this.state = {
      profile: ProfileStore.getState().profile,
      avatar: AvatarStore.getState().avatar,
    };

    this.ctrl = new FormController();
    this.ctrl.attachSubmit(this.onSubmit.bind(this));
    this.editPictureCtrl = new ModalFormController();
  }

  onStore(store) {
    const newState = Object.assign({}, this.state);

    if (store.error) {
      this.ctrl.messageCallback({
        title: 'Some error occurred when updating your profile',
        content: String(store.error),
        type: 'Alert',
      });
    } else {
      if (store.profile) {
        newState.profile = store.profile;
      } else {
        newState.avatar = store.avatar;
      }

      this.ctrl.messageCallback({
        title: 'Successful',
        content: 'Your informations have been updated',
        type: 'Success',
      });
    }

    this.setState(newState);
  }

  onSubmit(form) {
    form.interests = this.state.profile.interests;
    ProfileActions.update(form);
  }

  render() {
    const profile = this.state.profile || { interests: [] };
    const avatar = this.state.avatar;

    return (
      <div>
        <PanelForm controller={this.ctrl} submitLabel="Save">
          <Title>Update your profile</Title>
          <ClickablePicture url={avatar} onClick={this.editPictureCtrl.toggle} />

          <hr className="SpacedOverlay" />

          <TextInput value={profile.firstName} label="firstName" placeholder="First name" required />
          <TextInput value={profile.lastName} label="lastName" placeholder="Last name" required />

          <hr className="SpacedDivider" />

          <DateInput value={profile.birthdate} label="birthdate" max={Date.now()} defaultValue={nowToInput()} />
          <TextInput value={profile.phone} label="phone" />
          <TextInput value={profile.city} label="city" />
          <TextInput value={profile.country} label="country" />
          <TextArea value={profile.description} label="description" />

          <hr className="SpacedDivider" />

          <EditableInterests interests={profile.interests} />
        </PanelForm>

        <EditPicture controller={this.editPictureCtrl} />
      </div>
    );
  }
}
