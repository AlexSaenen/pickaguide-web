import React from 'react';

import { BasicForm } from 'formFramework/BasicForm.jsx';
import { PasswordInput } from 'formFramework/PasswordInput.jsx';
import { EmailInput } from 'formFramework/EmailInput.jsx';
import { StoreObserver } from 'base/StoreObserver.jsx';
import AccountActions from 'actions/Account.js';
import AccountStore from 'stores/Account.js';


export class SettingsAccount extends StoreObserver {

  constructor(props, context) {
    super(props, context, AccountStore);

    this.router = context.router;

    console.log('***', AccountStore.getState().account);
    this.state = {
      account: AccountStore.getState().account,
      isSuccess: null,
      messageTitle: '',
      messageContent: '',
    };

    this.onStoreChange = this.onStoreChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onStoreChange(store) {
    const stateCopy = Object.assign({}, this.state);
    stateCopy.account = store.account;
    console.log('onStoreChange Account:', stateCopy.account, '|', store);

    if (store.error) {
      stateCopy.messageTitle = 'Some error occurred when updating your account';
      stateCopy.messageContent = String(store.error);
      stateCopy.isSuccess = false;
    } else {
      stateCopy.messageTitle = 'Successful';
      stateCopy.messageContent = 'Your informations have been updated';
      stateCopy.isSuccess = true;
    }
    this.updateState(stateCopy);
  }

  handleSubmit(form) {
    console.log(form);
    // if (form.password) {
    //     // verif old password ?
    //   if (form.password !== form.passwordConfirmation) {
    //     AccountActions.error('The passwords do not match');
    //   } else {
    //     AccountActions.update(form);
    //   }
    // } else if (form.email) {
    //   if (form.email !== form.emailConfirmation) {
    //     AccountActions.error('The emails do not match');
    //   } else {
        AccountActions.update(form);
      // }
    // }
  }

  render() {
    const account = this.state.account || {};
    const message = {
      title: this.state.messageTitle,
      content: this.state.messageContent,
      type: (this.state.isSuccess ? 'Success' : 'Alert'),
    };

    return (
      <div>
        <BasicForm onSubmit={this.handleSubmit} submitLabel="Save" message={message}>
          <h1>Update your email</h1>
          <EmailInput value={account.email} label="email" placeholder="Entrez votre email" />
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
