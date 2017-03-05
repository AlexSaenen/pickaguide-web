import React from 'react';

import { PanelForm } from 'view/PanelForm.jsx';
import { PasswordInput } from 'form/PasswordInput.jsx';
import { EmailInput } from 'form/EmailInput.jsx';
import { StoreObserver } from 'base/StoreObserver.jsx';
import { Title } from 'layout/Title.jsx';
import AccountActions from 'actions/Account.js';
import AccountStore from 'stores/Account.js';


export class EditAccount extends StoreObserver {

  constructor(props, context) {
    super(props, context, AccountStore);

    this.state = {
      account: AccountStore.getState().account,
      messages: EditAccount.resetMessages(),
    };

    this.onStoreChange = this.onStoreChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static resetMessages() {
    return {
      titles: { mail: '', password: '' },
      content: { mail: '', password: '' },
      isSuccess: { mail: null, password: null },
    };
  }

  onStoreChange(store) {
    const stateCopy = Object.assign({}, this.state);
    stateCopy.account = store.account;
    stateCopy.messages = EditAccount.resetMessages();

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
        if (form.oldPassword === form.password) {
          AccountActions.updatePasswordError('Your new password needs to be different');
        } else {
          AccountActions.updatePassword({
            password: form.password,
            currentPassword: form.oldPassword,
          });
        }
      }
    } else {
      if (form.email !== form.emailConfirmation) {
        AccountActions.updateMailError('The emails do not match');
      } else {
        if (form.email === this.state.account.email) {
          AccountActions.updateMailError('Your new email needs to be different');
        } else {
          AccountActions.updateMail({ email: form.email });
        }
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
        <PanelForm onSubmit={this.handleSubmit} submitLabel="Update Email" message={messages.mail}>
          <Title>Update your email</Title>
          <hr className="Overlay" />
          <EmailInput placeholder={`Current Email: ${account.email}`} required />
          <EmailInput label="emailConfirmation" placeholder="Confirm email" required />
        </PanelForm>
        <PanelForm onSubmit={this.handleSubmit} submitLabel="Update Password" message={messages.password}>
          <Title>Update your password</Title>
          <hr className="Overlay" />
          <PasswordInput label="oldPassword" placeholder="Current password" required />
          <PasswordInput placeholder="New password" required />
          <PasswordInput label="passwordConfirmation" placeholder="Confirm password" required />
        </PanelForm>
      </div>
    );
  }
}
