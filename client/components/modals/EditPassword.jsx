import React from 'react';

import { StoreObserver } from 'base/StoreObserver.jsx';
import { ModalForm } from 'view/ModalForm.jsx';
import { PasswordInput } from 'form/PasswordInput.jsx';
import { Title } from 'layout/elements/Title.jsx';
import { strings } from './EditPassword_lang.js';
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
    return (
      <ModalForm controller={this.ctrl} {...this.props} layoutStyle="LayoutBlank Tight">
        <Title>{strings.title}</Title>
        <br />
        <PasswordInput displayLabel={false} label="currentPassword" placeholder={strings.curPass} required />
        <PasswordInput displayLabel={false} placeholder={strings.newPass} required />
        <PasswordInput displayLabel={false} label="passwordConfirmation" placeholder={strings.conPass} required />
      </ModalForm>
    );
  }
}
