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
import { strings } from './EditProfile_lang.js';
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
        title: String(strings.errorTitle),
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
        title: String(strings.successTitle),
        content: String(strings.successContent),
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
        <PanelForm controller={this.ctrl} submitLabel={strings.submit}>
          <Title>{strings.title}</Title>
          <ClickablePicture url={avatar} onClick={this.editPictureCtrl.toggle} />

          <hr className="SpacedOverlay" />

          <TextInput value={profile.firstName} label={strings.inputFirstName} placeholder={strings.inputFirstName} required />
          <TextInput value={profile.lastName} label={strings.inputLastName} placeholder={strings.inputLastName} required />

          <hr className="SpacedDivider" />

          <DateInput value={profile.birthdate} label={strings.inputBirthdate} max={Date.now()} defaultValue={nowToInput()} />
          <TextInput value={profile.phone} label={strings.inputPhone} />
          <TextInput value={profile.city} label={strings.inputCity} />
          <TextInput value={profile.country} label={strings.inputCountry} />
          <TextArea value={profile.description} label={strings.inputDescription} />

          <hr className="SpacedDivider" />

          <EditableInterests interests={profile.interests} />
        </PanelForm>

        <EditPicture controller={this.editPictureCtrl} />
      </div>
    );
  }
}
