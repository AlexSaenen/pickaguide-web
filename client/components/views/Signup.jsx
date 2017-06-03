import React from 'react';

import { PanelForm } from 'view/PanelForm.jsx';
import { TextInput } from 'form/TextInput.jsx';
import { EmailInput } from 'form/EmailInput.jsx';
import { PasswordInput } from 'form/PasswordInput.jsx';
import { StoreObserver } from 'base/StoreObserver.jsx';
import { Title } from 'layout/elements/Title.jsx';
import { Information } from 'layout/elements/Information.jsx';
import { strings } from './Singup_lang.js';
import SignupActions from 'actions/Signup.js';
import SignupStore from 'stores/user/Signup.js';


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
        title: String(strings.error),
        content: String(store.error),
        type: 'Alert',
      });
    } else {
      this.messageCallback({
        title: String(strings.success),
        content: store.message,
        type: 'Success',
      });
    }

    this.setState(stateCopy);
  }

  handleSubmit(form, submitName, messageCallback) {
    this.messageCallback = messageCallback;

    if (form.password !== form.passwordConfirmation) {
      SignupActions.error(strings.passwd_error);
    } else {
      delete form.passwordConfirmation;
      SignupActions.signup(form);
    }
  }

  render() {
    return (
      <div>
        <PanelForm onSubmit={this.handleSubmit} submitLabel={strings.submit}>
          <Title>{strings.title}</Title>

          <hr className="SpacedOverlay" />

          <TextInput label={strings.first_name} placeholder={strings.first_name} required />
          <TextInput label={strings.last_name} placeholder={strings.last_name} required />

          <hr className="SpacedDivider" />

          <EmailInput required />
          <Information>You will receive a confirmation email on the adress you provide here</Information>
          <PasswordInput required />
          <PasswordInput label={strings.password} placeholder={strings.password} required />
        </PanelForm>
      </div>
    );
  }
}
