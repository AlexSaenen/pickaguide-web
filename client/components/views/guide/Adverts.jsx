import React from 'react';

import { StoreObserver } from 'base/StoreObserver.jsx';
import { Title } from 'layout/elements/Title.jsx';
import { PanelList } from 'view/PanelList.jsx';
import { Element } from 'layout/list/Element.jsx';
import { Layout } from 'layout/containers/Layout.jsx';
import { Button } from 'layout/elements/Button.jsx';
import { AdCreation } from 'modals/AdCreation.jsx';
import SettingsStore from 'stores/user/Settings.js';


export class Adverts extends StoreObserver {

  constructor(props, context) {
    super(props, context, SettingsStore);

    this.state = {
      settings: SettingsStore.getState().settings,
      adCreationModalState: false,
    };

    this.toggleCreateAdModal = this.toggleCreateAdModal.bind(this);
    this.onStoreChange = this.onStoreChange.bind(this);
  }

  onStoreChange() {
    const stateCopy = Object.assign({}, this.state);
    stateCopy.settings = SettingsStore.getState().settings;
    this.updateState(stateCopy);
  }

  toggleCreateAdModal() {
    const stateCopy = Object.assign({}, this.state);
    stateCopy.adCreationModalState = !this.state.adCreationModalState;
    this.updateState(stateCopy);
  }

  render() {
    return (
      <div>
        <Layout layoutStyle="LayoutDark">
          <hr className="Overlay" />
          <Title>ADVERTS</Title>
        </Layout>
        <PanelList wrapChildren={false} panelStyle="Small">
          <Element><Button label="Create ad" onCallback={this.toggleCreateAdModal} /></Element>
        </PanelList>
        <AdCreation
          active={this.state.adCreationModalState}
          onClose={this.toggleCreateAdModal}
        />
      </div>
    );
  }
}
