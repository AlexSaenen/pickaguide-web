import React from 'react';

import { PanelForm } from 'view/PanelForm.jsx';
import { EmailInput } from 'form/EmailInput.jsx';
import { PasswordInput } from 'form/PasswordInput.jsx';
import { StoreObserver } from 'base/StoreObserver.jsx';
import { FormController } from 'base/FormController.jsx';
import { Title } from 'layout/elements/Title.jsx';
import AuthActions from 'actions/Auth.js';
import AuthStore from 'stores/user/Auth.js';


export class Login extends StoreObserver {

  constructor(props, context) {
    super(props, context, AuthStore);

    this.ctrl = new FormController();
    this.ctrl.attachSubmit(AuthActions.login);
  }

  onStore(store) {
    const newState = Object.assign({}, this.state);

    if (store.error) {
      this.ctrl.messageCallback({
        title: 'Some error occurred when logging in',
        content: String(store.error),
        type: 'Alert',
      });
    } else {
      this.ctrl.messageCallback({
        title: 'Successful',
        content: 'You have successfully logged in !',
        type: 'Success',
      });
    }

    this.setState(newState);
  }

  render() {
    return (
      <div>
        <PanelForm controller={this.ctrl} submitLabel="Login">
          <Title>Login</Title>
          <EmailInput required />
          <PasswordInput required />
        </PanelForm>
      </div>
    );
  }
}
