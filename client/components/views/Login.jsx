import React from 'react';

import { PanelForm } from 'view/PanelForm.jsx';
import { EmailInput } from 'form/EmailInput.jsx';
import { PasswordInput } from 'form/PasswordInput.jsx';
import { StoreObserver } from 'base/StoreObserver.jsx';
import { FormController } from 'base/FormController.jsx';
import { Title } from 'layout/elements/Title.jsx';
import { strings } from './Login_lang.js';
import AuthActions from 'actions/Auth.js';
import AuthStore from 'stores/user/Auth.js';
import LocalizedStrings from 'react-localization';



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
        title: String(strings.error),
        content: String(store.error),
        type: 'Alert',
      });
    } else {
      this.ctrl.messageCallback({
        title: String(strings.success),
        content: String(strings.content_success),
        type: 'Success',
      });
    }

    this.setState(newState);
  }

  render() {
    return (
      <div>
        <PanelForm controller={this.ctrl} submitLabel={strings.submit}>
          <Title>{strings.submit}</Title>
          <EmailInput label={strings.email} required />
          <PasswordInput label={strings.password} required />
        </PanelForm>
      </div>
    );
  }
}
