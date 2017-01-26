import React from 'react';

import { BasicForm } from 'formFramework/BasicForm.jsx';
import { EmailInput } from 'formFramework/EmailInput.jsx';
import { PasswordInput } from 'formFramework/PasswordInput.jsx';
import { StoreObserver } from 'base/StoreObserver.jsx';
import AuthActions from 'actions/Auth.js';
import AuthStore from 'stores/Auth.js';


export class Login extends StoreObserver {

  constructor(props, context) {
    super(props, context, AuthStore);

    this.state = {
      isSuccess: null,
      messageTitle: '',
      messageContent: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onStoreChange = this.onStoreChange.bind(this);
  }

  onStoreChange(store) {
    const stateCopy = Object.assign({}, this.state);

    if (store.error) {
      stateCopy.messageTitle = 'Some error occurred when logging in';
      stateCopy.messageContent = String(store.error);
      stateCopy.isSuccess = false;
    } else if (store.token) {
      stateCopy.messageTitle = 'Successful';
      stateCopy.messageContent = 'You have successfully logged in !';
      stateCopy.isSuccess = true;
    }

    this.updateState(stateCopy);
  }

  handleSubmit(form) {
    AuthActions.login(form);
  }

  render() {
    const message = {
      title: this.state.messageTitle,
      content: this.state.messageContent,
      type: (this.state.isSuccess ? 'Success' : 'Alert'),
    };

    return (
      <div>
        <BasicForm onSubmit={this.handleSubmit} submitLabel="Login" message={message}>
          <EmailInput placeholder="Email" required />
          <PasswordInput placeholder="Password" required />
        </BasicForm>
      </div>
    );
  }
}

Login.contextTypes = {
  router: React.PropTypes.object.isRequired,
};
