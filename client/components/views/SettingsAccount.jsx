import React from 'react';

import { BasicForm } from 'formFramework/BasicForm.jsx';
import { PasswordInput } from 'formFramework/PasswordInput.jsx';
import { EmailInput } from 'formFramework/EmailInput.jsx';
import { StoreObserver } from 'base/StoreObserver.jsx';
import AccountActions from 'actions/Account.js';
import ProfileStore from 'stores/Profile.js';
import AccountStore from 'stores/Account.js';


export class SettingsAccount extends StoreObserver {

  constructor(props, context) {
    super(props, context, ProfileStore);

    this.router = context.router;
    console.log('---', AccountStore.getState().account);
    this.state = {
      account: AccountStore.getState().account,
    };

    this.onStoreChange = this.onStoreChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onStoreChange() {
    const stateCopy = Object.assign({}, this.state);
    stateCopy.account = AccountStore.getState().account;
    console.log(stateCopy.account);
    this.updateState(stateCopy);
  }

  handleSubmit(form) {
    console.log(form);
    if (form.password) {
        // verif old password ?
      if (form.password !== form.passwordConfirmation) {
        AccountActions.error('The passwords do not match');
      } else {
        AccountActions.update(form);
      }
    } else if (form.email) {
      if (form.email !== form.emailConfirmation) {
        AccountActions.error('The emails do not match');
      } else {
        AccountActions.update(form);
      }
    }
    // <EmailInput value={this.state.account.email} placeholder="Entrez votre email" />
  }

  // TODO: Alex: Insert a title for Settings, make sure to create the element for that

  render() {
    return (
      <div>
        <BasicForm onSubmit={this.handleSubmit} submitLabel="Save">
          <h1>Update your email</h1>
          <EmailInput placeholder="Entrez votre email" />
          <EmailInput label="emailConfirmation" placeholder="Confirmez votre email" />
        </BasicForm>
        <BasicForm onSubmit={this.handleSubmit} submitLabel="Save">
          <h1>Update your password</h1>
          <PasswordInput label="oldPassword" placeholder="Entrez votre ancien mot de passe" />
          <PasswordInput placeholder="Entrez votre mot de passe" />
          <PasswordInput label="passwordConfirmation" placeholder="Confirmez votre mot de passe" />
        </BasicForm>
      </div>
    );
  }
}
