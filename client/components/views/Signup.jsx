import React from 'react';

import { PanelForm } from 'view/PanelForm.jsx';
import { TextInput } from 'form/TextInput.jsx';
import { EmailInput } from 'form/EmailInput.jsx';
import { PasswordInput } from 'form/PasswordInput.jsx';
import { StoreObserver } from 'base/StoreObserver.jsx';
import { FormController } from 'base/FormController.jsx';
import { Title } from 'layout/elements/Title.jsx';
import { Information } from 'layout/elements/Information.jsx';
import { strings } from './Singup_lang.js';
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
        title: String(strings.error),
        content: String(store.error),
        type: 'Alert',
      });
    } else {
      this.ctrl.messageCallback({
        title: String(strings.success),
        content: store.message,
        type: 'Success',
      });
    }


    this.setState(newState);
  }

  render() {
    return (
      <div>
        <PanelForm controller={this.ctrl} submitLabel={strings.submit}>
          <Title>{strings.title}</Title>

          <hr className="SpacedOverlay" />

          <TextInput label={strings.first_name} placeholder={strings.first_name} required />
          <TextInput label={strings.last_name} placeholder={strings.last_name} required />

          <hr className="SpacedDivider" />

          <EmailInput required />
          <Information>{string.success_info}</Information>
          <PasswordInput required />
          <PasswordInput label={strings.password} placeholder={strings.password} required />
        </PanelForm>
      </div>
    );
  }
}
