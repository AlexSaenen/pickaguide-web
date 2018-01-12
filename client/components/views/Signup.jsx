import React from 'react';

import { Form } from 'form/Form.jsx';
import { TextInput } from 'form/TextInput.jsx';
import { EmailInput } from 'form/EmailInput.jsx';
import { PasswordInput } from 'form/PasswordInput.jsx';
import { StoreObserver } from 'base/StoreObserver.jsx';
import { Title } from 'layout/elements/Title.jsx';
import { Layout } from 'layout/containers/Layout.jsx';
import { List } from 'layout/list/List.jsx';
import { Information } from 'layout/elements/Information.jsx';
import { strings } from './Singup_lang.js';
import SignupActions from 'actions/Signup.js';
import SignupStore from 'stores/user/Signup.js';


export class Signup extends StoreObserver {

  constructor(props, context) {
    super(props, context, SignupStore);

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
        content: store.message,
        type: 'Success',
      });
    }

    this.setState(newState);
  }

  onSubmit(form, messageCallback) {
    this.messageCallback = messageCallback;
    SignupActions.signup.defer(form);
  }

  render() {
    return (
      <div className="HomeContainer">
        <Layout>
          <Title>{strings.signupMessage}</Title>
          <p className="Italic">{strings.signupFollowup}</p>
        </Layout>
        <Layout>
          <hr className="Overlay" />
        </Layout>
        <Form layoutStyle="LayoutBlank SoftShadowNonHover W60 MarginAuto" onSubmit={this.onSubmit} submitLabel={strings.submit}>
          <Title>{strings.title}</Title>

          <List listStyle="ListGrid WidthFull" elementStyle="Vertical W50 NoWrap Box Transparent">
            <Layout layoutStyle="Transparent NoWrap Tight">
              <Information infoStyle="Info">{strings.success_info}</Information>
              <Layout layoutStyle="LayoutBlank SoftShadowNonHover">
                <TextInput displayLabel={false} label="firstName" placeholder={strings.first_name} required />
                <TextInput displayLabel={false} label="lastName" placeholder={strings.last_name} required />
              </Layout>
            </Layout>
            <Layout layoutStyle="LayoutBlank SoftShadowNonHover">
              <EmailInput displayLabel={false} required />
              <PasswordInput displayLabel={false} placeholder={strings.password} required />
              <PasswordInput displayLabel={false} label="passwordConfirmation" placeholder={strings.passwordConfirm} required />
            </Layout>
          </List>
        </Form>
      </div>
    );
  }
}
