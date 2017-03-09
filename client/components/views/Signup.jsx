import React from 'react';

import { PanelForm } from 'view/PanelForm.jsx';
import { TextInput } from 'form/TextInput.jsx';
import { EmailInput } from 'form/EmailInput.jsx';
import { PasswordInput } from 'form/PasswordInput.jsx';
import { StoreObserver } from 'base/StoreObserver.jsx';
import { Title } from 'layout/Title.jsx';
import SignupActions from 'actions/Signup.js';
import SignupStore from 'stores/Signup.js';


export class Signup extends StoreObserver {

  constructor(props, context) {
    super(props, context, SignupStore);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onStoreChange = this.onStoreChange.bind(this);
    this.messageCallback = () => {};
  }

  onStoreChange(store) {
    const stateCopy = Object.assign({}, this.state);

    if (store.error) {
      this.messageCallback({
        title: 'Some error occurred when creating your account',
        content: String(store.error),
        type: 'Alert',
      });
    } else {
      this.messageCallback({
        title: 'Info',
        content: store.message,
        type: 'Success',
      });
    }

    this.setState(stateCopy);
  }

  handleSubmit(form, submitName, messageCallback) {
    this.messageCallback = messageCallback;

    if (form.password !== form.passwordConfirmation) {
      SignupActions.error('The passwords do not match');
    } else {
      delete form.passwordConfirmation;
      SignupActions.signup(form);
    }
  }

  render() {
    return (
      <div>
        <PanelForm onSubmit={this.handleSubmit} submitLabel="Signup">
          <Title>Create an Account</Title>
          <hr className="Overlay" />
          <TextInput label="firstName" placeholder="First name" required />
          <TextInput label="lastName" placeholder="Last name" required />
          <hr className="Divider" />
          <EmailInput required />
          <PasswordInput required />
          <PasswordInput label="passwordConfirmation" placeholder="Confirm password" required />
        </PanelForm>
      </div>
    );
  }
}
