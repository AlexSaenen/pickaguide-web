import React from 'react';

import { PanelForm } from 'view/PanelForm.jsx';
import { TextInput } from 'form/TextInput.jsx';
import { StoreObserver } from 'base/StoreObserver.jsx';
import { Title } from 'layout/elements/Title.jsx';
import SettingsActions from 'actions/Settings.js';
import SettingsStore from 'stores/user/Settings.js';


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
        <PanelForm onSubmit={this.handleSubmit} submitLabel="Save">
          <Title>General settings</Title>
          <hr className="SpacedOverlay" />
          <TextInput label="firstName" placeholder="First name" />
          <TextInput label="lastName" placeholder="Last name" />
        </PanelForm>
      </div>
    );
  }
}
