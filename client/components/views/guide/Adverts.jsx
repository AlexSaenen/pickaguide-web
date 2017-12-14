import React from 'react';
import { browserHistory } from 'react-router';

import { StoreObserver } from 'base/StoreObserver.jsx';
import { Title } from 'layout/elements/Title.jsx';
import { Text } from 'layout/elements/Text.jsx';
import { PanelList } from 'view/PanelList.jsx';
import { OwnerAdvertPreview } from 'layout/user/OwnerAdvertPreview.jsx';
import { Layout } from 'layout/containers/Layout.jsx';
import { Button } from 'layout/elements/Button.jsx';
import { QueryModal } from 'modals/QueryModal.jsx';
import { Loader } from 'layout/elements/Loader.jsx';
import { ModalController } from 'base/ModalController.jsx';
import AdvertsStore from 'stores/user/Adverts.js';
import AdvertsActions from 'actions/Adverts.js';

export class Adverts extends StoreObserver {

  constructor(props, context) {
    super(props, context, AdvertsStore);

    this.state.adverts = null;
    this.reviewAdvert = this.reviewAdvert.bind(this);
    this.deleteAdCtrl = new ModalController();
  }

  componentDidMount() {
    super.componentDidMount();
    AdvertsActions.get();
  }

  onStore(store) {
    // const newState = Object.assign({}, this.state);
    // newState.adverts = store.adverts;
    this.setState({ adverts: store.adverts });
    // this.updateState(newState);
  }

  reviewAdvert(advertId) {
    browserHistory.push(`/guide/adverts/mine/${advertId}`);
  }

  navigateToAdCreation() {
    browserHistory.push('/guide/adverts/mine/new');
  }

  render() {
    const adverts = this.state.adverts;

    return (
      <div>
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
            onCallback={this.navigateToAdCreation}
          />
        </Layout>

        {
          adverts && adverts.length > 0 ?
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
              {
                adverts === null ?
                  <Loader />
                :
                  <Text>You have no Adverts yet ..</Text>
              }
            </Layout>
        }

      </div>
    );
  }
}
