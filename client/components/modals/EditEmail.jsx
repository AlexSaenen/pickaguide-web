import React from 'react';

import { StoreObserver } from 'base/StoreObserver.jsx';
import { ModalForm } from 'view/ModalForm.jsx';
import { EmailInput } from 'form/EmailInput.jsx';
import { Title } from 'layout/Title.jsx';
import AccountActions from 'actions/Account.js';
import AccountStore from 'stores/Account.js';


export class EditEmail extends StoreObserver {

  constructor(props, context) {
    super(props, context, AccountStore);

    this.state = { account: AccountStore.getState().account };

    this.onStoreChange = this.onStoreChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.messageCallback = () => {};
  }

  onStoreChange(store) {
    const stateCopy = Object.assign({}, this.state);
    stateCopy.account = store.account;

    if (store.error) {
      this.messageCallback({
        title: 'Some error occurred when updating your email',
        content: String(store.error),
        type: 'Alert',
      });
    } else {
      this.messageCallback({
        title: 'Successful',
        content: 'Your email has been updated',
        type: 'Success',
      });
    }

    this.setState(stateCopy);
  }

  handleSubmit(form, submitName, messageCallback) {
    this.messageCallback = messageCallback;

    if (form.email !== form.emailConfirmation) {
      AccountActions.error('The emails do not match');
    } else {
      if (form.email === this.state.account.email) {
        AccountActions.error('Your new email needs to be different');
      } else {
        AccountActions.updateMail({ email: form.email });
      }
    }
  }

  render() {
    const account = this.state.account;

    return (
      <ModalForm {...this.props} layoutStyle="LayoutDark Tight" onSubmit={this.handleSubmit}>
        <Title>Update Email</Title>
        <EmailInput placeholder={`New email (current: ${account.email})`} required />
        <EmailInput label="emailConfirmation" placeholder="Confirm email" required />
      </ModalForm>
    );
  }
}
