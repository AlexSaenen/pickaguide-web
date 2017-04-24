import React from 'react';

import { PanelForm } from 'view/PanelForm.jsx';
import { TextInput } from 'form/TextInput.jsx';
import { EmailInput } from 'form/EmailInput.jsx';
import { PasswordInput } from 'form/PasswordInput.jsx';
import { StoreObserver } from 'base/StoreObserver.jsx';
import { FormController } from 'base/FormController.jsx';
import { Title } from 'layout/elements/Title.jsx';
import { Information } from 'layout/elements/Information.jsx';
import SignupActions from 'actions/Signup.js';
import SignupStore from 'stores/user/Signup.js';


export class Signup extends StoreObserver {

  constructor(props, context) {
    super(props, context, SignupStore);

    this.ctrl = new FormController();
    this.ctrl.attachSubmit(SignupActions.signup);
  }

  onStore(store) {
    const newState = Object.assign({}, this.state);

    if (store.error) {
      this.ctrl.messageCallback({
        title: 'Some error occurred when creating your account',
        content: String(store.error),
        type: 'Alert',
      });
    } else {
      this.ctrl.messageCallback({
        title: 'Info',
        content: store.message,
        type: 'Success',
      });
    }

    this.setState(newState);
  }

  render() {
    return (
      <div>
        <PanelForm controller={this.ctrl} submitLabel="Signup">
          <Title>Create an Account</Title>

          <hr className="SpacedOverlay" />

          <TextInput label="firstName" placeholder="First name" required />
          <TextInput label="lastName" placeholder="Last name" required />

          <hr className="SpacedDivider" />

          <EmailInput required />
          <Information>You will receive a confirmation email on the adress you provide here</Information>
          <PasswordInput required />
          <PasswordInput label="passwordConfirmation" placeholder="Confirm password" required />
        </PanelForm>
      </div>
    );
  }
}
