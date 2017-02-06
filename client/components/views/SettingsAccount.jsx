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
      messages: {
        titles: { mail: '', password: '' },
        content: { mail: '', password: '' },
        isSuccess: { mail: null, password: null },
      },
    };

    this.onStoreChange = this.onStoreChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onStoreChange(store) {
    const stateCopy = Object.assign({}, this.state);
    stateCopy.account = store.account;
    console.log('onStoreChange Profile:', stateCopy.account, '|', store);

    const errorsToHandle = [];
    if (store.mailError) { errorsToHandle.push('mail'); }
    if (store.passwordError) { errorsToHandle.push('password'); }

    errorsToHandle.forEach((error) => {
      stateCopy.messages.titles[error] = `Some error occurred when updating your ${error}`;
      stateCopy.messages.content[error] = String(store[`${error}Error`]);
      stateCopy.messages.isSuccess[error] = false;
    });

    const eventsToHandle = [];
    if (store.mailSuccess) { eventsToHandle.push('mail'); }
    if (store.passwordSuccess) { eventsToHandle.push('password'); }

    eventsToHandle.forEach((error) => {
      stateCopy.messages.titles[error] = 'Successful';
      stateCopy.messages.content[error] = String(store[`${error}Success`]);
      stateCopy.messages.isSuccess[error] = true;
    });

    this.updateState(stateCopy);
  }

  handleSubmit(form, submitType) {
    if (submitType === 'Update Password') {
      if (form.password !== form.passwordConfirmation) {
        AccountActions.updatePasswordError('The passwords do not match');
      } else {
        AccountActions.updatePassword({
          password: form.password,
          currentPassword: form.oldPassword,
        });
      }
    } else {
      if (form.email !== form.emailConfirmation) {
        AccountActions.updateMailError('The emails do not match');
      } else {
        AccountActions.updateMail({ email: form.email });
      }
    }
  }

  render() {
    const account = this.state.account || {};
    const messages = {
      mail: {
        title: this.state.messages.titles.mail,
        content: this.state.messages.content.mail,
        type: (this.state.messages.isSuccess.mail ? 'Success' : 'Alert'),
      },
      password: {
        title: this.state.messages.titles.password,
        content: this.state.messages.content.password,
        type: (this.state.messages.isSuccess.password ? 'Success' : 'Alert'),
      },
    };

    return (
      <div>
        <BasicForm onSubmit={this.handleSubmit} submitLabel="Update Email" message={messages.mail}>
          <h1>Update your email</h1>
          <EmailInput value={account.email} placeholder="Entrez votre email" required />
          <EmailInput label="emailConfirmation" placeholder="Confirmez votre email" required />
        </BasicForm>
        <BasicForm onSubmit={this.handleSubmit} submitLabel="Update Password" message={messages.password}>
          <h1>Update your password</h1>
          <PasswordInput label="oldPassword" placeholder="Entrez votre ancien mot de passe" required />
          <PasswordInput placeholder="Entrez votre mot de passe" required />
          <PasswordInput label="passwordConfirmation" placeholder="Confirmez votre mot de passe" required />
        </BasicForm>
      </div>
    );
  }
}
