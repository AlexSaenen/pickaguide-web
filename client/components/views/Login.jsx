import React from 'react';
import { browserHistory } from 'react-router';

import { Form } from 'form/Form.jsx';
import { EmailInput } from 'form/EmailInput.jsx';
import { PasswordInput } from 'form/PasswordInput.jsx';
import { StoreObserver } from 'base/StoreObserver.jsx';
import { Title } from 'layout/elements/Title.jsx';
import { Button } from 'layout/elements/Button.jsx';
import { strings } from './Login_lang.js';
import AuthActions from 'actions/Auth.js';
import AuthStore from 'stores/user/Auth.js';


export class Login extends StoreObserver {

  constructor(props, context) {
    super(props, context, AuthStore);

    this.onSubmit = this.onSubmit.bind(this);
    this.messageCallback = () => {};
  }

  onStore(store) {
    const newState = Object.assign({}, this.state);

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

    this.setState(newState);
  }

  onSubmit(form, messageCallback) {
    this.messageCallback = messageCallback;
    AuthActions.login.defer(form);
  }

  render() {
    return (
      <div className="HomeContainer">
        <Form layoutStyle="LayoutBlank SoftShadowNonHover W30 MarginAuto" submitLabel={strings.submit} onSubmit={this.onSubmit}>
          <Title>{strings.submit}</Title>
          <Button label="Or create an account" buttonStyle="MarginAuto Blue Auto LineSpaced" onCallback={() => { browserHistory.push('/signup'); }} />
          <EmailInput displayLabel={false} placeholder={strings.email} required />
          <PasswordInput displayLabel={false} placeholder={strings.password} required />
        </Form>

      </div>
    );
  }
}
