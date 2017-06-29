import React from 'react';
import { browserHistory } from 'react-router';

import { StoreObserver } from 'base/StoreObserver.jsx';
import { ModalFormController } from 'base/ModalFormController.jsx';
import { Title } from 'layout/elements/Title.jsx';
import { Text } from 'layout/elements/Text.jsx';
import { PanelList } from 'view/PanelList.jsx';
import { OwnerAdvertPreview } from 'layout/user/OwnerAdvertPreview.jsx';
import { Layout } from 'layout/containers/Layout.jsx';
import { Button } from 'layout/elements/Button.jsx';
import { AdCreation } from 'modals/AdCreation.jsx';
import { QueryModal } from 'modals/QueryModal.jsx';
import { ModalController } from 'base/ModalController.jsx';
import AdvertsStore from 'stores/user/Adverts.js';
import AdvertsActions from 'actions/Adverts.js';


export class Adverts extends StoreObserver {

  constructor(props, context) {
    super(props, context, AdvertsStore);

    this.state.adverts = AdvertsStore.getState().adverts;
    this.reviewAdvert = this.reviewAdvert.bind(this);
    this.deleteAdCtrl = new ModalController();
    this.adCreationCtrl = new ModalFormController();
  }

  onStore(store) {
    const newState = Object.assign({}, this.state);
    newState.adverts = store.adverts;
    this.updateState(newState);
  }

  reviewAdvert(advertId) {
    browserHistory.push(`/guide/adverts/mine/${advertId}`);
  }

  render() {
    const adverts = this.state.adverts || [];

    return (
      <div>
        <AdCreation controller={this.adCreationCtrl} />
        <QueryModal
          controller={this.deleteAdCtrl}
          query="Do you really wish to delete this Ad ?"
          onConfirm={
            function confirm() {
              AdvertsActions.remove(this.deleteAdCtrl.callerId);
            }.bind(this)
          }
        />

        <Layout layoutStyle="LayoutLight">
          <Title>Adverts</Title>
          <Button
            label="New"
            buttonStyle="Auto Red TextWhite Bold"
            onCallback={this.adCreationCtrl.toggle}
          />
        </Layout>

        {
          adverts.length > 0 ?
            <Layout>
              <hr className="Overlay" />
              <PanelList layoutStyle="LayoutLight" panelStyle="Wide" listStyle="ListGrid" elementStyle="Large Tight Clickable">
                {
                  adverts.map((advert, index) => {
                    return <OwnerAdvertPreview {...advert} key={index} onClick={this.reviewAdvert} deleter={this.deleteAdCtrl} />;
                  })
                }
              </PanelList>
            </Layout>
          :
            <Layout layoutStyle="LayoutBlank">
              <hr className="Overlay" />
              <Text>You have no Adverts yet ..</Text>
            </Layout>
        }

      </div>
    );
  }
}
