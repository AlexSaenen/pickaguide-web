import React from 'react';

import { PanelForm } from 'view/PanelForm.jsx';
import { PanelLayout } from 'view/PanelLayout.jsx';
import { TextInput } from 'form/TextInput.jsx';
import { DateInput, nowToInput } from 'form/DateInput.jsx';
import { TextArea } from 'form/TextArea.jsx';
import { StoreObserver } from 'base/StoreObserver.jsx';
import { Button } from 'layout/elements/Button.jsx';
import { FormController } from 'base/FormController.jsx';
import { ModalFormController } from 'base/ModalFormController.jsx';
import { Title } from 'layout/elements/Title.jsx';
import { ClickablePicture } from 'layout/user/ClickablePicture.jsx';
import { EditableInterests } from 'layout/user/EditableInterests.jsx';
import { EditPicture } from 'modals/EditPicture.jsx';
import { strings } from './EditProfile_lang.js';
import ProfileActions from 'actions/Profile.js';
import AvatarActions from 'actions/Avatar.js';
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

  componentDidMount() {
    super.componentDidMount();
    if (this.state.profile === null) {
      ProfileActions.get();
    }
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
    form.interests = this.interestEditor.state.interests;
    ProfileActions.update(form);
  }

  render() {
    const profile = this.state.profile;
    const avatar = this.state.avatar;

    if (profile === null) {
      return (<PanelLayout layoutStyle="LayoutLight Tight" />);
    }

    return (
      <div>
        <PanelForm controller={this.ctrl} submitLabel={strings.submit}>
          <Title>{strings.title}</Title>
          <ClickablePicture url={avatar} onClick={this.editPictureCtrl.toggle} />
          {
            profile.hasAvatar &&
              <Button
                buttonStyle="Red Auto LineSpaced"
                label="Remove Picture"
                onCallback={AvatarActions.remove}
              />
          }

          <hr className="SpacedOverlay" />

          <TextInput value={profile.firstName} label="firstName" placeholder={strings.inputFirstName} required />
          <TextInput value={profile.lastName} label="lastName" placeholder={strings.inputLastName} required />

          <hr className="SpacedDivider" />

          <DateInput value={profile.birthdate} label="birthdate" max={Date.now()} defaultValue={nowToInput()} />
          <TextInput value={profile.phone || ''} label="phone" />
          <TextInput value={profile.city || ''} label="city" />
          <TextInput value={profile.country || ''} label="country" />
          <TextArea value={profile.description || ''} label="description" />

          <hr className="SpacedDivider" />

          <EditableInterests interests={profile.interests} ref={(el) => { this.interestEditor = el; }} />
        </PanelForm>

        <EditPicture controller={this.editPictureCtrl} />
      </div>
    );
  }
}
