import React from 'react';

import { FormLayout } from 'formFramework/FormLayout.jsx';
import { TextInput } from 'formFramework/TextInput.jsx';
import { StoreObserver } from 'base/StoreObserver.jsx';
import { Title } from 'base/Title.jsx';
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

  render() {
    return (
      <div>
        <FormLayout onSubmit={this.handleSubmit} submitLabel="Save">
          <Title>General settings</Title>
          <TextInput label="language" placeholder="Entrez votre prénom" />
          <TextInput label="lastName" placeholder="Entrez votre nom" />
        </FormLayout>
      </div>
    );
  }
}
