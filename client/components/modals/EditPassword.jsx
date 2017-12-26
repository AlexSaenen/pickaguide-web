import React from 'react';

import { StoreObserver } from 'base/StoreObserver.jsx';
import { ModalForm } from 'view/ModalForm.jsx';
import { PasswordInput } from 'form/PasswordInput.jsx';
import { Title } from 'layout/elements/Title.jsx';
import PasswordActions from 'actions/Password.js';
import PasswordStore from 'stores/user/Password.js';


export class EditPassword extends StoreObserver {

  constructor(props, context) {
    super(props, context, PasswordStore);

    this.ctrl = props.controller;
    this.ctrl.attachSubmit(PasswordActions.update);
  }

  onStore(store) {
    const newState = Object.assign({}, this.state);

    if (store.error) {
      this.ctrl.messageCallback({
        title: 'Some error occurred when updating your password',
        content: String(store.error),
        type: 'Alert',
      });
    } else {
      this.ctrl.messageCallback({
        title: 'Successful',
        content: 'Your password has been updated',
        type: 'Success',
      });
    }

    this.setState(newState);
  }

  render() {
    return (
      <ModalForm controller={this.ctrl} {...this.props} layoutStyle="LayoutBlank Tight">
        <Title>Update Password</Title>
        <br />
        <PasswordInput displayLabel={false} label="currentPassword" placeholder="Current password" required />
        <PasswordInput displayLabel={false} placeholder="New password" required />
        <PasswordInput displayLabel={false} label="passwordConfirmation" placeholder="Confirm password" required />
      </ModalForm>
    );
  }
}
