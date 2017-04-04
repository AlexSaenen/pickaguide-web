import React from 'react';

import { StoreObserver } from 'base/StoreObserver.jsx';
import { Title } from 'layout/elements/Title.jsx';
import { PanelList } from 'view/PanelList.jsx';
import { AdvertPreview } from 'layout/user/AdvertPreview.jsx';
import { Layout } from 'layout/containers/Layout.jsx';
import { Button } from 'layout/elements/Button.jsx';
import { AdCreation } from 'modals/AdCreation.jsx';
import AdvertsStore from 'stores/user/Adverts.js';


export class Adverts extends StoreObserver {

  constructor(props, context) {
    super(props, context, AdvertsStore);

    this.state = {
      adverts: AdvertsStore.getState().adverts,
      adCreationModalState: false,
    };

    this.toggleCreateAdModal = this.toggleCreateAdModal.bind(this);
    this.onStoreChange = this.onStoreChange.bind(this);
  }

  onStoreChange(store) {
    const stateCopy = Object.assign({}, this.state);
    stateCopy.adverts = store.adverts;

    this.updateState(stateCopy);
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
        <Layout layoutStyle="LayoutDark">
          <hr className="Overlay" />
          <Title>ADVERTS</Title>
          <Button label="Create ad" buttonStyle="Auto" onCallback={this.toggleCreateAdModal} />
        </Layout>

        {
          adverts.length > 0 &&
            <PanelList panelStyle="Wide" listStyle="ListGrid" elementStyle="Large Tight">
            {
              adverts.map((advert, index) => {
                return <AdvertPreview {...advert} key={index} />;
              })
            }
            </PanelList>
        }

        <AdCreation
          active={this.state.adCreationModalState}
          onClose={this.toggleCreateAdModal}
        />
      </div>
    );
  }
}
