import React from 'react';

import { FormLayout } from 'formFramework/FormLayout.jsx';
import { TextInput } from 'formFramework/TextInput.jsx';
import { EmailInput } from 'formFramework/EmailInput.jsx';
import { PasswordInput } from 'formFramework/PasswordInput.jsx';
import { StoreObserver } from 'base/StoreObserver.jsx';
import { Title } from 'layout/Title.jsx';
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
    console.log('onStoreChange:', store, '|', stateCopy);
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
      SignupActions.error('The passwords do not match');
    } else {
      delete form.passwordConfirmation;
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
        <FormLayout onSubmit={this.handleSubmit} submitLabel="Signup" message={message}>
          <Title>Create an Account</Title>
          <hr className="Overlay" />
          <TextInput label="firstName" placeholder="First name" required />
          <TextInput label="lastName" placeholder="Last name" required />
          <hr className="Divider" />
          <EmailInput required />
          <PasswordInput required />
          <PasswordInput label="passwordConfirmation" placeholder="Confirm password" required />
        </FormLayout>
      </div>
    );
  }
}
