import React from 'react';
import { browserHistory } from 'react-router';

import { StoreObserver } from 'base/StoreObserver.jsx';
import { FeedableModalFormController } from 'base/FeedableModalFormController.jsx';
import { ModalFormController } from 'base/ModalFormController.jsx';
import { ModalController } from 'base/ModalController.jsx';
import { ClickablePicture } from 'layout/user/ClickablePicture.jsx';
import { Title } from 'layout/elements/Title.jsx';
import { Text } from 'layout/elements/Text.jsx';
import { ToggleCheckMark } from 'layout/user/ToggleCheckMark.jsx';
import { Layout } from 'layout/containers/Layout.jsx';
import { Element } from 'layout/list/Element.jsx';
import { Button } from 'layout/elements/Button.jsx';
import { PanelList } from 'view/PanelList.jsx';
import { EditAdvertCover } from 'modals/EditAdvertCover.jsx';
import { EditText } from 'modals/EditText.jsx';
import { EditTextArea } from 'modals/EditTextArea.jsx';
import { QueryModal } from 'modals/QueryModal.jsx';
import AdvertsStore from 'stores/user/Adverts.js';
import AdvertsActions from 'actions/Adverts.js';

import 'scss/views/adverts.scss';

const getCache = (advertId) => {
  const storeCache = AdvertsStore.getState().specificAdvert;

  return (storeCache && storeCache._id === advertId ? storeCache : undefined);
};


export class OwnerAdvert extends StoreObserver {

  constructor(props, context) {
    super(props, context, AdvertsStore);

    this.id = this.props.params.id;
    this.state = { advert: getCache(this.id) };

    this.onToggle = this.onToggle.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
    this.textEditorCtrl = new FeedableModalFormController();
    this.areaEditorCtrl = new ModalFormController();
    this.coverEditorCtrl = new ModalFormController();
    this.deleteCtrl = new ModalController();
    this.textEditorCtrl.attachSubmit(this.onUpdate);
    this.areaEditorCtrl.attachSubmit(this.onUpdate);
    this.coverEditorCtrl.attachSubmit(this.onUpdate);
  }

  componentWillReceiveProps(nextProps) {
    this.id = nextProps.params.id;
    const nextState = Object.assign({}, this.state);
    nextState.advert = getCache(this.id);

    this.setState(nextState);

    if (nextState.advert === undefined) {
      AdvertsActions.find(this.id);
    }
  }

  componentDidMount() {
    super.componentDidMount();
    if (this.state.advert === undefined) {
      AdvertsActions.find(this.id);
    }
  }

  onStore(store) {
    const nextState = Object.assign({}, this.state);

    if (store.error) {
      return;
    } else if (store.specificAdvert && store.specificAdvert._id === this.id) {
      nextState.advert = store.specificAdvert;
    } else {
      nextState.advert = getCache(this.id);
    }

    this.setState(nextState);
  }

  onToggle(clickEvent) {
    clickEvent.stopPropagation();
    const newState = Object.assign({}, this.state);
    newState.advert.active = !newState.advert.active;
    this.onUpdate(newState.advert);
  }

  onUpdate(advert) {
    this.textEditorCtrl.close();
    this.areaEditorCtrl.close();
    this.coverEditorCtrl.close();
    advert._id = this.state.advert._id;
    AdvertsActions.update(advert);
  }

  onDelete() {
    AdvertsActions.remove(this.state.advert._id);
    browserHistory.goBack();
  }

  render() {
    const advert = this.state.advert;

    if (advert === undefined || advert === null) {
      return (
        <Layout layoutStyle="LayoutBlank">
          <Text>No such advert found</Text>
        </Layout>
      );
    }

    return (
      <div className="OwnerAdvert">
        <QueryModal
          controller={this.deleteCtrl}
          query="Do you really wish to delete this Ad ?"
          onConfirm={this.onDelete}
        />

        <Layout layoutStyle="LayoutLight">
          <hr className="Overlay" />

          <Title
            onClick={
              function click() {
                this.textEditorCtrl.feed({ label: 'title', title: 'Edit advert\'s title', value: advert.title });
                this.textEditorCtrl.toggle(true);
              }.bind(this)
            }
          >
            {advert.title}
          </Title>

          <div>
            <Button label="Back" buttonStyle="Auto TextWhite Bold Spaced" onCallback={browserHistory.goBack} />
            <Button buttonStyle="Red Auto TextWhite Bold" label="Delete" onCallback={this.deleteCtrl.toggle} />
          </div>

          <PanelList listStyle="ListGrid" wrapChildren={false}>
            <Element elementStyle="Auto Clickable" onClick={this.areaEditorCtrl.toggle}>
              <p className="Spaced OverflowHidden TextOverflow">{advert.description}</p>
            </Element>

            <Element elementStyle="Auto Tight Clickable">
              <ToggleCheckMark transition={false} active={advert.active} onToggle={this.onToggle} />
            </Element>

            <Element elementStyle="Auto Tight Clickable">
              <ClickablePicture onClick={this.coverEditorCtrl.toggle} url={advert.photoUrl} />
            </Element>
          </PanelList>
        </Layout>

        <EditText controller={this.textEditorCtrl} />
        <EditTextArea
          controller={this.areaEditorCtrl}
          value={advert.description}
          label="description"
          title="Edit advert's description"
        />
        <EditAdvertCover controller={this.coverEditorCtrl} />
      </div>
    );
  }
}
