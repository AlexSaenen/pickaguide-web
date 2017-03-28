import React from 'react';

import { StoreObserver } from 'base/StoreObserver.jsx';
import { ModalForm } from 'view/ModalForm.jsx';
import { TextInput } from 'form/TextInput.jsx';
import { Title } from 'layout/elements/Title.jsx';
import { TextArea } from 'form/TextArea.jsx';
import { ClickablePicture } from 'layout/user/ClickablePicture.jsx';
import { EditPicture } from 'modals/EditPicture.jsx';
import AdvertsActions from 'actions/Adverts.js';
import AdvertsStore from 'stores/Adverts.js';


export class AdCreation extends StoreObserver {

  constructor(props, context) {
    super(props, context, AdvertsStore);

    this.state = {
      adverts: AdvertsStore.getState().adverts,
      modalState: false,
    };

    this.onStoreChange = this.onStoreChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.messageCallback = () => {};
  }

  onStoreChange(store) {
    const stateCopy = Object.assign({}, this.state);

    if (store.error) {
      this.messageCallback({
        title: 'Some error occurred when creating your ad',
        content: String(store.error),
        type: 'Alert',
      });
    } else {
      this.messageCallback({
        title: 'Successful',
        content: 'Your ad has been created',
        type: 'Success',
      });
    }

    this.setState(stateCopy);
  }

  toggleModal() {
    const stateCopy = Object.assign({}, this.state);
    stateCopy.modalState = !this.state.modalState;
    this.updateState(stateCopy);
  }

  handleSubmit(form, submitName, messageCallback) {
    this.messageCallback = messageCallback;
    AdvertsActions.create(form);
  }

  render() {
    const adverts = this.state.adverts || {};

    return (
      <ModalForm {...this.props} layoutStyle="LayoutDark Tight" modalStyle="Large" onSubmit={this.handleSubmit}>
        <Title>Create an Ad</Title>

        <hr className="SpacedOverlay" />

        <TextInput label="title" placeholder="Title" required />
        <TextInput label="price" placeholder="prix de l'heure" required />
        <TextArea label="description" required />

        <hr className="SpacedDivider" />

        <ClickablePicture url={adverts.photoUrl} onClick={this.toggleModal} />

        <EditPicture
          active={this.state.modalState}
          onClose={this.toggleModal}
        />
      </ModalForm>
    );
  }
}
