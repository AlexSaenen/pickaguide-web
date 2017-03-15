import React from 'react';

import { PanelLayout } from 'view/PanelLayout.jsx';
import { EditPassword } from 'modals/EditPassword.jsx';
import { EditEmail } from 'modals/EditEmail.jsx';
import { StateComponent } from 'base/StateComponent.jsx';
import { Title } from 'layout/Title.jsx';
import { Button } from 'layout/Button.jsx';


export class EditAccount extends StateComponent {

  constructor(props, context) {
    super(props, context);

    this.state = {
      passwordModalState: false,
      emailModalState: false,
    };

    this.togglePasswordModal = this.togglePasswordModal.bind(this);
    this.toggleEmailModal = this.toggleEmailModal.bind(this);
  }

  togglePasswordModal() {
    const stateCopy = Object.assign({}, this.state);
    stateCopy.passwordModalState = !this.state.passwordModalState;
    this.updateState(stateCopy);
  }

  toggleEmailModal() {
    const stateCopy = Object.assign({}, this.state);
    stateCopy.emailModalState = !this.state.emailModalState;
    this.updateState(stateCopy);
  }

  render() {
    return (
      <div>
        <PanelLayout panelStyle="Small">
          <Title>Edit your Account</Title>
          <hr className="Overlay" />
          <Button label="Change Password" onCallback={this.togglePasswordModal} />
          <Button label="Change Email" onCallback={this.toggleEmailModal} />
        </PanelLayout>

        <EditPassword
          active={this.state.passwordModalState}
          onClose={this.togglePasswordModal}
        />
        <EditEmail
          active={this.state.emailModalState}
          onClose={this.toggleEmailModal}
        />
      </div>
    );
  }
}
