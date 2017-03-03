import React from 'react';

import { FormLayout } from 'formFramework/FormLayout.jsx';
import { TextInput } from 'formFramework/TextInput.jsx';
import { StoreObserver } from 'base/StoreObserver.jsx';
import { Title } from 'layout/Title.jsx';
import SettingsActions from 'actions/Settings.js';
import SettingsStore from 'stores/Settings.js';


export class Settings extends StoreObserver {

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
        <FormLayout onSubmit={this.handleSubmit} submitLabel="Save">
          <Title>General settings</Title>
          <hr className="Overlay" />
          <TextInput label="firstName" placeholder="First name" />
          <TextInput label="lastName" placeholder="Last name" />
        </FormLayout>
      </div>
    );
  }
}
