import React from 'react';

import { StoreObserver } from 'base/StoreObserver.jsx';
import { ModalForm } from 'view/ModalForm.jsx';
import { PasswordInput } from 'form/PasswordInput.jsx';
import { Title } from 'layout/Title.jsx';
import PasswordActions from 'actions/Password.js';
import PasswordStore from 'stores/Password.js';


export class EditPassword extends StoreObserver {

  constructor(props, context) {
    super(props, context, PasswordStore);

    this.onStoreChange = this.onStoreChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.messageCallback = () => {};
  }

  onStoreChange(store) {
    const stateCopy = Object.assign({}, this.state);

    if (store.error) {
      this.messageCallback({
        title: 'Some error occurred when updating your password',
        content: String(store.error),
        type: 'Alert',
      });
    } else {
      this.messageCallback({
        title: 'Successful',
        content: 'Your password has been updated',
        type: 'Success',
      });
    }

    this.setState(stateCopy);
  }

  handleSubmit(form, submitName, messageCallback) {
    this.messageCallback = messageCallback;

    if (form.password !== form.passwordConfirmation) {
      PasswordActions.error('The passwords do not match');
    } else {
      if (form.currentPassword === form.password) {
        PasswordActions.error('Your new password needs to be different');
      } else {
        PasswordActions.update(form);
      }
    }
  }

  render() {
    return (
      <ModalForm {...this.props} layoutStyle="LayoutDark Tight" onSubmit={this.handleSubmit}>
        <Title>Update Password</Title>
        <PasswordInput label="currentPassword" placeholder="Current password" required />
        <PasswordInput placeholder="New password" required />
        <PasswordInput label="passwordConfirmation" placeholder="Confirm password" required />
      </ModalForm>
    );
  }
}
