import React from 'react';

import { PanelForm } from 'view/PanelForm.jsx';
import { TextInput } from 'form/TextInput.jsx';
import { StoreObserver } from 'base/StoreObserver.jsx';
import { Title } from 'layout/elements/Title.jsx';
import SettingsActions from 'actions/Settings.js';
import SettingsStore from 'stores/Settings.js';


export class Adverts extends StoreObserver {

  constructor(props, context) {
    super(props, context, SettingsStore);

    this.state = {
      settings: SettingsStore.getState().settings,
    };

    this.onStoreChange = this.onStoreChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onStoreChange() {
    const stateCopy = Object.assign({}, this.state);
    stateCopy.settings = SettingsStore.getState().settings;
    this.updateState(stateCopy);
  }

  handleSubmit(form) {
    SettingsActions.update(form);
  }

  render() {
    return (
      <div>
      <p>ADVERTS area, the guide will be able to create, edit, remove and see all his ads !</p>
      </div>
    );
  }
}
