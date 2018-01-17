import React from 'react';

import { StoreObserver } from 'base/StoreObserver.jsx';
import { ModalForm } from 'view/ModalForm.jsx';
import { EmailInput } from 'form/EmailInput.jsx';
import { Title } from 'layout/elements/Title.jsx';
import { strings } from './EditEmail_lang.js'
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

  render() {
    const account = this.state.account || {};

    return (
      <ModalForm controller={this.ctrl} {...this.props} layoutStyle="LayoutBlank Tight">
        <Title>{strings.title}</Title>
        <br />
        <EmailInput displayLabel={false} placeholder={strings.newEmail + `(current: ${account.email})`} required />
        <EmailInput displayLabel={false} label="emailConfirmation" placeholder={strings.conEmail} required />
      </ModalForm>
    );
  }
}
