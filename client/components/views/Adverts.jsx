import React from 'react';

import { PanelForm } from 'view/PanelForm.jsx';
import { TextInput } from 'form/TextInput.jsx';
import { TextArea } from 'form/TextArea.jsx';
import { StoreObserver } from 'base/StoreObserver.jsx';
import { Title } from 'layout/elements/Title.jsx';
import { Button } from 'layout/elements/Button.jsx';
import { ClickablePicture } from 'layout/user/ClickablePicture.jsx';
import { EditPicture } from 'modals/EditPicture.jsx';
import { Guide } from 'modals/Guide.jsx';
import ProfileActions from 'actions/Profile.js';
import ProfileStore from 'stores/user/Profile.js';


export class Adverts extends StoreObserver {

  constructor(props, context) {
    super(props, context, ProfileStore);

    this.state = {
      profile: ProfileStore.getState().profile,
      modalState: false,
      modalStateGuide: false,
    };

    this.onStoreChange = this.onStoreChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.messageCallback = () => {};
    this.toggleModal = this.toggleModal.bind(this);
    this.toggleModalGuide = this.toggleModalGuide.bind(this);
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
    this.updateState(stateCopy);
  }

  toggleModalGuide() {
    const stateCopy = Object.assign({}, this.state);
    stateCopy.modalStateGuide = !this.state.modalStateGuide;
    this.updateState(stateCopy);
  }

  render() {
    const profile = this.state.profile || {};

    return (
      <div>
        <h1>ADVERTS</h1>
      </div>
    );
  }
}
