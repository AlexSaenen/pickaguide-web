import React from 'react';

import { StoreObserver } from 'base/StoreObserver.jsx';
import { ModalForm } from 'view/ModalForm.jsx';
import { PasswordInput } from 'form/PasswordInput.jsx';
import { EmailInput } from 'form/EmailInput.jsx';
import { Title } from 'layout/elements/Title.jsx';
import AccountStore from 'stores/user/Account.js';
import UserStore from 'stores/user/User.js';

export class DeleteAccount extends StoreObserver {

  constructor(props, context) {
    super(props, context, UserStore);

    this.ctrl = props.controller;
    this.ctrl.attachSubmit(this.handleSubmit.bind(this));
  }

  onStore(store) {
    const newState = Object.assign({}, this.state);

    if (store.error) {
      this.ctrl.messageCallback({
        title: 'Some error occurred when deleting your account',
        content: String(store.error),
        type: 'Alert',
      });
    } else {
      this.ctrl.messageCallback({
        title: 'Successful',
        content: 'Your account has been deleted',
        type: 'Success',
      });
    }

    this.setState(newState);
  }

  handleSubmit(form) {
    const account = AccountStore.getState().account;

    if (account && account.email === form.email) {
      this.props.onSubmit(form);
    } else {
      this.ctrl.messageCallback({
        title: 'Some error occurred when deleting your account',
        content: 'Does not seem like your email address',
        type: 'Alert',
      }, false);
    }
  }

  render() {
    return (
      <ModalForm controller={this.ctrl} {...this.props} layoutStyle="LayoutDark Tight">
        <Title>Login to delete your account</Title>
        <EmailInput required />
        <PasswordInput required />
      </ModalForm>
    );
  }
}
