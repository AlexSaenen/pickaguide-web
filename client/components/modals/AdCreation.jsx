import React from 'react';

import { StoreObserver } from 'base/StoreObserver.jsx';
import { ModalForm } from 'view/ModalForm.jsx';
import { TextInput } from 'form/TextInput.jsx';
import { Title } from 'layout/elements/Title.jsx';
import { TextArea } from 'form/TextArea.jsx';
import { ClickablePicture } from 'layout/user/ClickablePicture.jsx';
import { EditAdvertCover } from 'modals/EditAdvertCover.jsx';
import AdvertsActions from 'actions/Adverts.js';
import AdvertsStore from 'stores/user/Adverts.js';


export class AdCreation extends StoreObserver {

  constructor(props, context) {
    super(props, context, AdvertsStore);

    this.state = {
      modalState: false,
      advert: {
        url: 'http://www.newyorker.com/wp-content/uploads/2015/12/Veix-Goodbye-New-York-Color-1200.jpg',
      },
    };

    this.onStoreChange = this.onStoreChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateCover = this.updateCover.bind(this);
    this.toggleModal = this.toggleModal.bind(this);

    this.messageCallback = () => {};
    this.modalTimeout = null;
  }

  componentWillUnmount() {
    if (this.modalTimeout) {
      clearTimeout(this.modalTimeout);
    }
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

  updateCover(form, submitName, messageCallback) {
    const stateCopy = Object.assign({}, this.state);
    stateCopy.advert.url = form.photoUrl;

    messageCallback({
      title: 'Successful',
      content: 'Your picture has been updated',
      type: 'Info',
    });

    this.modalTimeout = setTimeout(() => {
      if (this.state.modalState) {
        this.toggleModal();
      }

      this.modalTimeout = null;
    }, 5000);

    this.setState(stateCopy);
  }

  handleSubmit(form, submitName, messageCallback) {
    this.messageCallback = messageCallback;
    form.photoUrl = this.state.advert.url;
    AdvertsActions.create(form);
  }

  render() {
    const advert = this.state.advert || {};

    return (
      <div>
        <ModalForm {...this.props} layoutStyle="LayoutDark Tight" modalStyle="Large" onSubmit={this.handleSubmit}>
          <Title>Create an Ad</Title>

          <ClickablePicture url={advert.url} onClick={this.toggleModal} />

          <hr className="SpacedOverlay" />

          <TextInput label="title" value={advert.title} required />
          <TextInput label="hourlyPrice" value={advert.hourlyPrice} placeholder="Hourly price" required />
          <TextArea label="description" value={advert.description} required />
        </ModalForm>

        <EditAdvertCover
          active={this.state.modalState}
          onClose={this.toggleModal}
          onSubmit={this.updateCover}
        />
      </div>
    );
  }
}
