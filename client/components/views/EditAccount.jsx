import React from 'react';

// import { PanelLayout } from 'view/PanelLayout.jsx';
import { Panel } from 'layout/containers/Panel.jsx';
import { Layout } from 'layout/containers/Layout.jsx';
import { EditPassword } from 'modals/EditPassword.jsx';
import { EditEmail } from 'modals/EditEmail.jsx';
import { StoreObserver } from 'base/StoreObserver.jsx';
import { Title } from 'layout/elements/Title.jsx';
import { Information } from 'layout/elements/Information.jsx';
import { Button } from 'layout/elements/Button.jsx';
import AccountStore from 'stores/user/Account.js';


export class EditAccount extends StoreObserver {

  constructor(props, context) {
    super(props, context, AccountStore);

    this.state = {
      passwordModalState: false,
      emailModalState: false,
      isConfirmed: AccountStore.getState().isConfirmed,
    };

    this.togglePasswordModal = this.togglePasswordModal.bind(this);
    this.toggleEmailModal = this.toggleEmailModal.bind(this);
    this.onStoreChange = this.onStoreChange.bind(this);
  }

  onStoreChange(store) {
    const stateCopy = Object.assign({}, this.state);

    if (store.error == null) {
      stateCopy.isConfirmed = store.isConfirmed;
    }

    this.updateState(stateCopy);
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
        <Panel panelStyle="Medium">
          <Layout layoutStyle="LayoutGray">
            <Title>Edit your Account</Title>
          </Layout>
          <Layout layoutStyle="LayoutLight">
            <hr className="Overlay" />
            <Button buttonStyle="Blue Spaced Auto TextWhite" label="Change Password" onCallback={this.togglePasswordModal} />
            <Button buttonStyle="Blue Spaced Auto TextWhite" label="Change Email" onCallback={this.toggleEmailModal} />
            <Information infoStyle="Alert" active={!this.state.isConfirmed}>You need to confirm your email</Information>
          </Layout>
        </Panel>

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
