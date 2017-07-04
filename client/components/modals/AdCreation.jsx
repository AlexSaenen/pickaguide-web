import React from 'react';

import { StoreObserver } from 'base/StoreObserver.jsx';
import { ModalFormController } from 'base/ModalFormController.jsx';
import { ModalForm } from 'view/ModalForm.jsx';
import { TextInput } from 'form/TextInput.jsx';
import { Title } from 'layout/elements/Title.jsx';
import { TextArea } from 'form/TextArea.jsx';
import { ClickablePicture } from 'layout/user/ClickablePicture.jsx';
import { EditAdvertCover } from 'modals/EditAdvertCover.jsx';
import AdvertsActions from 'actions/Adverts.js';
import AdvertsStore from 'stores/user/Adverts.js';

const defaultCoverUrl = 'http://www.newyorker.com/wp-content/uploads/2015/12/Veix-Goodbye-New-York-Color-1200.jpg';


export class AdCreation extends StoreObserver {

  constructor(props, context) {
    super(props, context, AdvertsStore);

    this.state = {
      advert: {
        url: defaultCoverUrl,
      },
    };

    this.editCoverCtrl = new ModalFormController();
    this.editCoverCtrl.attachSubmit(this.updateCover.bind(this));
    this.ctrl = props.controller;
    this.ctrl.attachSubmit(this.onSubmit.bind(this));
  }

  onStore(store) {
    if (store.error) {
      this.ctrl.messageCallback({
        title: 'Some error occurred when creating your ad',
        content: String(store.error),
        type: 'Alert',
      });
    } else {
      AdvertsStore.unlisten(this.onStore);
      this.ctrl.closeAndReset();
      const newState = Object.assign({}, this.state);
      newState.advert.url = defaultCoverUrl;
      this.setState(newState);
    }
  }

  updateCover(form) {
    const newState = Object.assign({}, this.state);
    newState.advert.url = form.photoUrl;
    this.editCoverCtrl.closeAndReset();
    this.setState(newState);
  }

  onSubmit(form) {
    form.photoUrl = this.state.advert.url;
    AdvertsStore.listen(this.onStore);
    AdvertsActions.create(form);
  }

  render() {
    const advert = this.state.advert || {};

    return (
      <div>
        <ModalForm controller={this.ctrl} layoutStyle="LayoutDark Tight" modalStyle="Large">
          <Title>Create Ad</Title>

          <ClickablePicture url={advert.url} onClick={this.editCoverCtrl.toggle} />

          <hr className="SpacedOverlay" />

          <TextInput label="title" value={advert.title} required />
          <TextArea label="description" value={advert.description} required />
        </ModalForm>

        <EditAdvertCover controller={this.editCoverCtrl} />
      </div>
    );
  }
}

AdCreation.propTypes = {
  controller: React.PropTypes.object.isRequired,
};
