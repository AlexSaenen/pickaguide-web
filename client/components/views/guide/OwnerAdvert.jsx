import React from 'react';

import { StoreObserver } from 'base/StoreObserver.jsx';
import { ClickablePicture } from 'layout/user/ClickablePicture.jsx';
import { Title } from 'layout/elements/Title.jsx';
import { ToggleCheckMark } from 'layout/user/ToggleCheckMark.jsx';
import { Layout } from 'layout/containers/Layout.jsx';
import { Element } from 'layout/list/Element.jsx';
import { PanelList } from 'view/PanelList.jsx';
import { EditAdvertCover } from 'modals/EditAdvertCover.jsx';
import { EditText } from 'modals/EditText.jsx';
import AdvertsStore from 'stores/user/Adverts.js';
import AdvertsActions from 'actions/Adverts.js';


export class OwnerAdvert extends StoreObserver {

  constructor(props, context) {
    super(props, context, AdvertsStore);

    this.state = {
      advert: AdvertsStore.getState().specificAdvert,
      modalStates: {
        cover: false,
        text: false,
      },
      textEditor: {
        label: 'text',
        value: 'None',
        title: 'Edit Text',
      },
    };

    this.update = this.update.bind(this);
    this.openTextEditor = this.openTextEditor.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.onStoreChange = this.onStoreChange.bind(this);
    this.toggleAdvertState = this.toggleAdvertState.bind(this);
  }

  onStoreChange(store) {
    const stateCopy = Object.assign({}, this.state);
    stateCopy.advert = store.specificAdvert;
    this.setState(stateCopy);
  }

  toggleModal(which) {
    const stateCopy = Object.assign({}, this.state);
    stateCopy.modalStates[which] = !this.state.modalStates[which];
    this.setState(stateCopy);
  }

  toggleAdvertState(clickEvent) {
    clickEvent.stopPropagation();
    const stateCopy = Object.assign({}, this.state);
    stateCopy.advert.active = !stateCopy.advert.active;
    this.update(stateCopy.advert);
  }

  openTextEditor(editWhat, title) {
    const stateCopy = Object.assign({}, this.state);
    stateCopy.textEditor = { label: editWhat, value: this.state.advert[editWhat], title };
    stateCopy.modalStates.text = true;
    this.setState(stateCopy);
  }

  update(advert) {
    advert._id = this.state.advert._id;
    AdvertsActions.update(advert);
    const stateCopy = Object.assign({}, this.state);
    stateCopy.modalStates = { text: false, cover: false };
    this.updateState(stateCopy);
  }

  render() {
    const advert = this.state.advert;

    if (advert.photoUrl === undefined) {
      advert.photoUrl = 'http://www.freeiconspng.com/free-images/no-image-icon-23492';
      advert.active = false;
    }

    return (
      <div>
        <Layout layoutStyle="LayoutLight">
          <hr className="Overlay" />
          <Title>{advert.title}</Title>
          <PanelList listStyle="ListGrid" wrapChildren={false}>
            <Element elementStyle="Auto Clickable">
              <p
                className="Spaced OverflowHidden"
                onClick={
                  function click() {
                    this.openTextEditor('description', 'Edit advert\'s description');
                  }.bind(this)
                }
              >{advert.description}</p>
            </Element>
            <Element elementStyle="Small Clickable">
              <p
                className="Bold Inline Vertical"
                onClick={
                  function click() {
                    this.openTextEditor('hourlyPrice', 'Edit advert\'s hourly price');
                  }.bind(this)
                }
              >{advert.hourlyPrice}</p>
            </Element>
            <Element elementStyle="Auto Tight">
              <ToggleCheckMark transition={false} active={advert.active} onToggle={this.toggleAdvertState} />
            </Element>
            <Element elementStyle="Auto Tight">
              <ClickablePicture
                onClick={
                  function click() {
                    this.toggleModal('cover');
                  }.bind(this)
                }
                url={advert.photoUrl}
              />
            </Element>
          </PanelList>
        </Layout>

        <EditAdvertCover
          active={this.state.modalStates.cover}
          onClose={this.toggleModal}
          onSubmit={this.update}
        />
        <EditText
          {...this.state.textEditor}
          active={this.state.modalStates.text}
          onClose={this.toggleModal}
          onSubmit={this.update}
        />
      </div>
    );
  }
}
