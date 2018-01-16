import React from 'react';

import { StoreObserver } from 'base/StoreObserver.jsx';
import { ModalForm } from 'view/ModalForm.jsx';
import { PasswordInput } from 'form/PasswordInput.jsx';
import { EmailInput } from 'form/EmailInput.jsx';
import { Title } from 'layout/elements/Title.jsx';
import AccountStore from 'stores/user/Account.js';
import { strings } from './DeleteAccount_lang.js';
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
        title: String(strings.error),
        content: String(store.error),
        type: 'Alert',
      });
    } else {
      this.ctrl.messageCallback({
        title: String(strings.successTitle),
        content: String(strings.successDesc),
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
        title: String(strings.errorTitle),
        content: String(strings.errorDesc),
        type: 'Alert',
      }, false);
    }
  }

  render() {
    return (
      <ModalForm controller={this.ctrl} {...this.props} layoutStyle="LayoutBlank Tight">
        <Title>{strings.title}</Title>
        <br />
        <EmailInput displayLabel={false} placeholder={strings.email} required />
        <PasswordInput displayLabel={false} placeholder={strings.password} required />
      </ModalForm>
    );
  }
}
