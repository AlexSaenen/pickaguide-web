import React from 'react';

import { PanelForm } from 'view/PanelForm.jsx';
import { EmailInput } from 'form/EmailInput.jsx';
import { PasswordInput } from 'form/PasswordInput.jsx';
import { StoreObserver } from 'base/StoreObserver.jsx';
import { Title } from 'layout/elements/Title.jsx';
import AuthActions from 'actions/Auth.js';
import AuthStore from 'stores/Auth.js';


export class Login extends StoreObserver {

  constructor(props, context) {
    super(props, context, AuthStore);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onStoreChange = this.onStoreChange.bind(this);
    this.messageCallback = () => {};
  }

  onStoreChange(store) {
    const stateCopy = Object.assign({}, this.state);

    if (store.error) {
      this.messageCallback({
        title: 'Some error occurred when logging in',
        content: String(store.error),
        type: 'Alert',
      });
    } else {
      this.messageCallback({
        title: 'Successful',
        content: 'You have successfully logged in !',
        type: 'Success',
      });
    }

    this.setState(stateCopy);
  }

  handleSubmit(form, submitName, messageCallback) {
    this.messageCallback = messageCallback;
    AuthActions.login(form);
  }

  render() {
    return (
      <div>
        <PanelForm onSubmit={this.handleSubmit} submitLabel="Login">
          <Title>Login</Title>
          <EmailInput required />
          <PasswordInput required />
        </PanelForm>
      </div>
    );
  }
}
