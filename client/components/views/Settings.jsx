import React from 'react';

import { BasicForm } from 'formFramework/BasicForm.jsx';
import { TextInput } from 'formFramework/TextInput.jsx';
import { StoreObserver } from 'base/StoreObserver.jsx';
import SettingsActions from 'actions/Settings.js';
import SettingsStore from 'stores/Settings.js';


export class Settings extends StoreObserver {

  constructor(props, context) {
    super(props, context, SettingsStore);

    this.router = context.router;
    console.log('---', SettingsStore.getState().settings);
    this.state = {
      settings: SettingsStore.getState().settings,
    };

    this.onStoreChange = this.onStoreChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onStoreChange() {
    const stateCopy = Object.assign({}, this.state);
    stateCopy.settings = SettingsStore.getState().settings;
    console.log(stateCopy.settings);
    this.updateState(stateCopy);
  }

  handleSubmit(form) {
    console.log(form);
    SettingsActions.update(form);
  }

  // TODO: Alex: Insert a title for Settings, make sure to create the element for that

  render() {
    return (
      <div>
        <BasicForm onSubmit={this.handleSubmit} submitLabel="Save">
          <h1>General settings</h1>
          <TextInput label="language" placeholder="Entrez votre prénom" />
          <TextInput label="lastName" placeholder="Entrez votre nom" />
        </BasicForm>
      </div>
    );
  }
}
