import React from 'react';

import { PropsComponent } from 'base/PropsComponent.jsx';
import { ModalForm } from 'view/ModalForm.jsx';
import { PasswordInput } from 'form/PasswordInput.jsx';
import { EmailInput } from 'form/EmailInput.jsx';
import { Title } from 'layout/elements/Title.jsx';


export class DeleteAccount extends PropsComponent {

  constructor(props, context) {
    super(props, context);

    this.ctrl = props.controller;
    this.ctrl.attachSubmit(this.props.onSubmit);
  }

  onStore(store) {
    const newState = Object.assign({}, this.state);

    if (store.error) {
      this.ctrl.messageCallback({
        title: 'Some error occurred when deleting your account',
        content: String(store.error),
        type: 'Alert',
      });
    } else {
      this.ctrl.messageCallback({
        title: 'Successful',
        content: 'Your account has been deleted',
        type: 'Success',
      });
    }

    this.setState(newState);
  }

  render() {
    return (
      <ModalForm controller={this.ctrl} {...this.props} layoutStyle="LayoutDark Tight">
        <Title>Login to delete your account</Title>
        <EmailInput required />
        <PasswordInput required />
      </ModalForm>
    );
  }
}
