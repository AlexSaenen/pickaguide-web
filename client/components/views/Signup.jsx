import React from 'react';

import { BasicForm } from 'formFramework/BasicForm.jsx';
import { TextInput } from 'formFramework/TextInput.jsx';
import { EmailInput } from 'formFramework/EmailInput.jsx';
import { PasswordInput } from 'formFramework/PasswordInput.jsx';
import { StoreObserver } from 'base/StoreObserver.jsx';
import SignupActions from 'actions/Signup.js';
import SignupStore from 'stores/Signup.js';


export class Signup extends StoreObserver {

  constructor(props, context) {
    super(props, context, SignupStore);

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

    stateCopy.isSuccess = !store.error;
    if (store.error) {
      stateCopy.messageTitle = 'Some error occurred when creating your account';
      stateCopy.messageContent = String(store.error);
    } else {
      stateCopy.messageTitle = 'Info';
      stateCopy.messageContent = store.message;
    }

    this.updateState(stateCopy);
  }

  handleSubmit(form) {
    if (form.password !== form.passwordConfirmation) {
      SignupActions.signupValidationError('The passwords do not match');
    } else {
      SignupActions.signup(form);
    }
  }

  render() {
    const message = {
      title: this.state.messageTitle,
      content: this.state.messageContent,
      type: (this.state.isSuccess ? 'Success' : 'Alert'),
    };

    return (
      <div>
        <BasicForm onSubmit={this.handleSubmit} submitLabel="Signup" message={message}>
          <TextInput label="firstName" placeholder="Entrez votre prénom" required />
          <TextInput label="lastName" placeholder="Entrez votre nom" required />
          <EmailInput placeholder="Entrez votre email" required />
          <PasswordInput placeholder="Entrez votre mot de passe" required />
          <PasswordInput label="passwordConfirmation" placeholder="Confirmez le mot de passe" required />
        </BasicForm>
      </div>
    );
  }
}
