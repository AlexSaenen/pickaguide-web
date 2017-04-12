import React from 'react';

import { PropsComponent } from 'base/PropsComponent.jsx';
import { ModalForm } from 'view/ModalForm.jsx';
import { TextInput } from 'form/TextInput.jsx';
import { Title } from 'layout/elements/Title.jsx';
import { TextArea } from 'form/TextArea.jsx';
import { ClickablePicture } from 'layout/user/ClickablePicture.jsx';
import { EditAdvertCover } from 'modals/EditAdvertCover.jsx';
import AdvertsActions from 'actions/Adverts.js';
import AdvertsStore from 'stores/user/Adverts.js';


export class AdCreation extends PropsComponent {

  constructor(props, context) {
    super(props, context);

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
      AdvertsStore.unlisten(this.onStoreChange);
      this.props.onClose();
    }

    this.setState(stateCopy);
  }

  toggleModal() {
    const stateCopy = Object.assign({}, this.state);
    stateCopy.modalState = !this.state.modalState;
    this.updateState(stateCopy);
  }

  updateCover(form) {
    const stateCopy = Object.assign({}, this.state);
    stateCopy.advert.url = form.photoUrl;
    stateCopy.modalState = false;
    this.setState(stateCopy);
  }

  handleSubmit(form, submitName, messageCallback) {
    this.messageCallback = messageCallback;
    form.photoUrl = this.state.advert.url;
    AdvertsStore.listen(this.onStoreChange);
    AdvertsActions.create(form);
  }

  render() {
    const advert = this.state.advert || {};

    return (
      <div>
        <ModalForm {...this.props} layoutStyle="LayoutDark Tight" modalStyle="Large" onSubmit={this.handleSubmit}>
          <Title>Create Ad</Title>

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
