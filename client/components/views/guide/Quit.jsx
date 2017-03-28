import React from 'react';

import { PanelForm } from 'view/PanelForm.jsx';
import { TextInput } from 'form/TextInput.jsx';
import { StoreObserver } from 'base/StoreObserver.jsx';
import { Title } from 'layout/elements/Title.jsx';
import SettingsActions from 'actions/Settings.js';
import ProfileStore from 'stores/Settings.js';


export class Quit extends StoreObserver {

  constructor(props, context) {
    super(props, context, ProfileStore);

    this.state = {
      settings: ProfileStore.getState().profile,
    };

    this.onStoreChange = this.onStoreChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onStoreChange() {
    const stateCopy = Object.assign({}, this.state);
    stateCopy.settings = ProfileStore.getState().settings;
    this.updateState(stateCopy);
  }

  handleSubmit(form) {
    SettingsActions.update(form);
  }

  render() {
    return (
      <div>
        <p>No interface just send the request to API and pass the bool to false !</p>
      </div>
    );
  }
}
