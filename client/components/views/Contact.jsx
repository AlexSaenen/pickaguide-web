import React from 'react';

import { Layout } from 'layout/containers/Layout.jsx';
import { TextArea } from 'form/TextArea.jsx';
import { TextInput } from 'form/TextInput.jsx';
import { Form } from 'form/Form.jsx';
import { TelInput } from 'form/TelInput.jsx';
import { EmailInput } from 'form/EmailInput.jsx';
import { StoreObserver } from 'base/StoreObserver.jsx';
import { Title } from 'layout/elements/Title.jsx';
import { strings } from './Contact_lang.js';
import ContactActions from 'actions/Contact.js';
import AccountStore from 'stores/user/Account.js';
import ProfileStore from 'stores/user/Profile.js';
import ContactStore from 'stores/user/Contact.js';

export class Contact extends StoreObserver {

  constructor(props, context) {
    super(props, context, [AccountStore, ProfileStore, ContactStore]);

    this.state = {
      account: AccountStore.getState().account,
      profile: ProfileStore.getState().profile,
    };

    this.onStore = this.onStore.bind(this);
    this.onContact = this.onContact.bind(this);
  }

  onContact(store) {
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
        content: String(strings.success_content),
        type: 'Success',
      });
    }

    this.setState(newState);
  }

  onStore(store) {
    const newState = Object.assign({}, this.state);

    if (store.account) {
      newState.account = store.account;
    } else if (store.profile) {
      newState.profile = store.profile;
    }

    this.updateState(newState);
  }

  handleSubmit(form, submitName, messageCallback) {
    this.messageCallback = messageCallback;
    ContactActions.contact(form);
  }

  render() {
    const account = this.state.account;
    const profile = this.state.profile;

    return (
      <div>
        <Layout>
          <Title>{strings.contact_us}</Title>
        </Layout>
        <Layout>
          <hr className="Overlay" />
          <Layout layoutStyle="LayoutRegular W30E MW90 MarginAuto SoftShadowNonHover BigVerticalMargin">
            <p className="Italic Small">06.70.62.85.88 - <a href="mailto:contact@pickaguide.com" className="Blue DecorationNoneImportant">contact@pickaguide.com</a></p>
          </Layout>

          <Form layoutStyle="W30E MW90 MarginAuto SoftShadowNonHover BigVerticalMargin" onSubmit={this.handleSubmit.bind(this)} submitLabel={strings.submit}>
            <Title smaller>{strings.leaveMessage}</Title>
            <br />
            <TextInput label="name" displayLabel={strings.fname} value={profile ? `${profile.firstName} ${profile.lastName}` : ''} placeholder={strings.fname} required />
            <EmailInput displayLabel={strings.email} value={account ? account.email : ''} required />
            <TelInput label="phone" displayLabel={strings.phone} value={profile ? profile.phone : ''} />
            <TextArea label="message" displayLabel={strings.message} required />
          </Form>
        </Layout>
      </div>
    );
  }
}
