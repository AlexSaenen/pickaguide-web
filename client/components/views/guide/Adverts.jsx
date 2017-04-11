import React from 'react';
import { browserHistory } from 'react-router';

import { StoreObserver } from 'base/StoreObserver.jsx';
import { Title } from 'layout/elements/Title.jsx';
import { PanelList } from 'view/PanelList.jsx';
import { AdvertPreview } from 'layout/user/AdvertPreview.jsx';
import { Layout } from 'layout/containers/Layout.jsx';
import { Button } from 'layout/elements/Button.jsx';
import { AdCreation } from 'modals/AdCreation.jsx';
import AdvertsStore from 'stores/user/Adverts.js';
import AdvertsActions from 'actions/Adverts.js';


export class Adverts extends StoreObserver {

  constructor(props, context) {
    super(props, context, AdvertsStore);

    this.state = {
      adverts: AdvertsStore.getState().adverts,
      adCreationModalState: false,
    };

    this.toggleCreateAdModal = this.toggleCreateAdModal.bind(this);
    this.reviewAdvert = this.reviewAdvert.bind(this);
    this.onStoreChange = this.onStoreChange.bind(this);
  }

  onStoreChange(store) {
    const stateCopy = Object.assign({}, this.state);
    stateCopy.adverts = store.adverts;

    this.updateState(stateCopy);
  }

  reviewAdvert(advertId) {
    AdvertsActions.find(advertId);
    browserHistory.push(`/guide/adverts/mine/${advertId}`);
  }

  toggleCreateAdModal() {
    const stateCopy = Object.assign({}, this.state);
    stateCopy.adCreationModalState = !this.state.adCreationModalState;

    this.updateState(stateCopy);
  }

  render() {
    const adverts = this.state.adverts || [];

    return (
      <div>
        <Layout layoutStyle="LayoutLight">
          <Title>Adverts</Title>
          <Button label="New" buttonStyle="Auto Red TextWhite Bold" onCallback={this.toggleCreateAdModal} />
        </Layout>

        <Layout layoutStyle="LayoutDark">
          <hr className="Overlay" />
          {
            adverts.length > 0 &&
              <PanelList layoutStyle="LayoutLight" panelStyle="Wide" listStyle="ListGrid" elementStyle="Large Tight Clickable">
                {
                  adverts.map((advert, index) => {
                    return <AdvertPreview {...advert} key={index} onClick={this.reviewAdvert} />;
                  })
                }
              </PanelList>
          }
        </Layout>

        <AdCreation
          active={this.state.adCreationModalState}
          onClose={this.toggleCreateAdModal}
        />
      </div>
    );
  }
}
