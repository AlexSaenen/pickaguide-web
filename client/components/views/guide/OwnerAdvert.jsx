import React from 'react';
import { browserHistory } from 'react-router';

import { StoreObserver } from 'base/StoreObserver.jsx';
import { ClickablePicture } from 'layout/user/ClickablePicture.jsx';
import { Title } from 'layout/elements/Title.jsx';
import { ToggleCheckMark } from 'layout/user/ToggleCheckMark.jsx';
import { Layout } from 'layout/containers/Layout.jsx';
import { Element } from 'layout/list/Element.jsx';
import { Button } from 'layout/elements/Button.jsx';
import { PanelList } from 'view/PanelList.jsx';
import { EditAdvertCover } from 'modals/EditAdvertCover.jsx';
import { EditText } from 'modals/EditText.jsx';
import { EditTextArea } from 'modals/EditTextArea.jsx';
import AdvertsStore from 'stores/user/Adverts.js';
import AdvertsActions from 'actions/Adverts.js';

import 'scss/views/adverts.scss';


export class OwnerAdvert extends StoreObserver {

  constructor(props, context) {
    super(props, context, AdvertsStore);

    this.state = {
      advert: AdvertsStore.getState().specificAdvert,
      modalStates: { cover: false, text: false, textarea: false },
      textEditor: { label: 'text', value: 'None', title: 'Edit Text' },
      textAreaEditor: { label: 'textarea', value: 'None', title: 'Edit TextArea' },
    };

    this.update = this.update.bind(this);
    this.openTextEditor = this.openTextEditor.bind(this);
    this.openTextAreaEditor = this.openTextAreaEditor.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.onStoreChange = this.onStoreChange.bind(this);
    this.toggleAdvertState = this.toggleAdvertState.bind(this);
    this.onDelete = this.onDelete.bind(this);
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
    stateCopy.modalStates = { text: true, textarea: false, cover: false };
    this.setState(stateCopy);
  }

  openTextAreaEditor(editWhat, title) {
    const stateCopy = Object.assign({}, this.state);
    stateCopy.textAreaEditor = { label: editWhat, value: this.state.advert[editWhat], title };
    stateCopy.modalStates = { text: false, textarea: true, cover: false };
    this.setState(stateCopy);
  }

  update(advert) {
    advert._id = this.state.advert._id;
    AdvertsActions.update(advert);
    const stateCopy = Object.assign({}, this.state);
    stateCopy.modalStates = { text: false, cover: false };
    this.updateState(stateCopy);
  }

  onDelete() {
    AdvertsActions.remove(this.state.advert._id);
    browserHistory.goBack();
  }

  render() {
    const advert = this.state.advert;

    if (advert.photoUrl === undefined) {
      advert.photoUrl = 'http://www.freeiconspng.com/free-images/no-image-icon-23492';
      advert.active = false;
    }

    return (
      <div className="OwnerAdvert">
        <Layout layoutStyle="LayoutLight">
          <hr className="Overlay" />

          <Title
            onClick={
              function click() {
                this.openTextEditor('title', 'Edit advert\'s title');
              }.bind(this)
            }
          >
            {advert.title}
          </Title>

          <div>
            <Button label="Back" buttonStyle="Auto TextWhite Bold Spaced" onCallback={browserHistory.goBack} />
            <Button buttonStyle="Red Auto TextWhite Bold" label="Delete" onCallback={this.onDelete} />
          </div>

          <PanelList listStyle="ListGrid" wrapChildren={false}>
            <Element
              elementStyle="Auto Clickable"
              onClick={
                function click() {
                  this.openTextAreaEditor('description', 'Edit advert\'s description');
                }.bind(this)
              }
            >
              <p className="Spaced OverflowHidden TextOverflow">{advert.description}</p>
            </Element>

            <Element
              elementStyle="Small Clickable"
              onClick={
                function click() {
                  this.openTextEditor('hourlyPrice', 'Edit advert\'s hourly price');
                }.bind(this)
              }
            >
              <p className="Bold Inline Vertical">{advert.hourlyPrice}</p>
            </Element>

            <Element elementStyle="Auto Tight Clickable">
              <ToggleCheckMark transition={false} active={advert.active} onToggle={this.toggleAdvertState} />
            </Element>

            <Element elementStyle="Auto Tight Clickable">
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

        <EditTextArea
          {...this.state.textAreaEditor}
          active={this.state.modalStates.textarea}
          onClose={this.toggleModal}
          onSubmit={this.update}
        />
      </div>
    );
  }
}
