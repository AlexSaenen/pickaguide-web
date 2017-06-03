import React from 'react';

import { PanelForm } from 'view/PanelForm.jsx';
import { EmailInput } from 'form/EmailInput.jsx';
import { PasswordInput } from 'form/PasswordInput.jsx';
import { StoreObserver } from 'base/StoreObserver.jsx';
import { Title } from 'layout/elements/Title.jsx';
import { strings } from './Login_lang.js';
import AuthActions from 'actions/Auth.js';
import AuthStore from 'stores/user/Auth.js';
import LocalizedStrings from 'react-localization';



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
        title: String(strings.error),
        content: String(store.error),
        type: 'Alert',
      });
    } else {
      this.messageCallback({
        title: String(strings.success),
        content: String(strings.content_success),
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
        <PanelForm onSubmit={this.handleSubmit} submitLabel={strings.submit}>
          <Title>{strings.submit}</Title>
          <EmailInput label={strings.email} required />
          <PasswordInput label={strings.password} required />
        </PanelForm>
      </div>
    );
  }
}
