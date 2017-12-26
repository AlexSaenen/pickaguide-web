import React from 'react';

import { StoreObserver } from 'base/StoreObserver.jsx';
import { ModalForm } from 'view/ModalForm.jsx';
import { EmailInput } from 'form/EmailInput.jsx';
import { Title } from 'layout/elements/Title.jsx';
import AccountActions from 'actions/Account.js';
import AccountStore from 'stores/user/Account.js';


export class EditEmail extends StoreObserver {

  constructor(props, context) {
    super(props, context, AccountStore);

    this.state = { account: AccountStore.getState().account };
    this.ctrl = props.controller;
    this.ctrl.attachSubmit(AccountActions.updateMail);
  }

  onStore(store) {
    const newState = Object.assign({}, this.state);
    newState.account = store.account;

    if (store.error) {
      this.ctrl.messageCallback({
        title: 'Some error occurred when updating your email',
        content: String(store.error),
        type: 'Alert',
      });
    } else {
      this.ctrl.messageCallback({
        title: 'Successful',
        content: 'Your email has been updated',
        type: 'Success',
      });
    }

    this.setState(newState);
  }

  render() {
    const account = this.state.account || {};

    return (
      <ModalForm controller={this.ctrl} {...this.props} layoutStyle="LayoutBlank Tight">
        <Title>Update Email</Title>
        <EmailInput placeholder={`New email (current: ${account.email})`} required />
        <EmailInput label="emailConfirmation" placeholder="Confirm email" required />
      </ModalForm>
    );
  }
}
