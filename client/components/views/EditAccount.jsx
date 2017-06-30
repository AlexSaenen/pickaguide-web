import React from 'react';

import { Panel } from 'layout/containers/Panel.jsx';
import { Layout } from 'layout/containers/Layout.jsx';
import { EditPassword } from 'modals/EditPassword.jsx';
import { EditEmail } from 'modals/EditEmail.jsx';
import { QueryModal } from 'modals/QueryModal.jsx';
import { StoreObserver } from 'base/StoreObserver.jsx';
import { ModalFormController } from 'base/ModalFormController.jsx';
import { ModalController } from 'base/ModalController.jsx';
import { Title } from 'layout/elements/Title.jsx';
import { Information } from 'layout/elements/Information.jsx';
import { Button } from 'layout/elements/Button.jsx';
import { strings } from './EditAccount_lang.js';
import AccountStore from 'stores/user/Account.js';
import UserActions from 'actions/User.js';
import AuthActions from 'actions/Auth.js';


export class EditAccount extends StoreObserver {

  constructor(props, context) {
    super(props, context, AccountStore);

    this.state = { isConfirmed: AccountStore.getState().isConfirmed };
    this.editPasswordCtrl = new ModalFormController();
    this.editEmailCtrl = new ModalFormController();
    this.deleteCtrl = new ModalController();
  }

  onStore(store) {
    const newState = Object.assign({}, this.state);

    if (store.error == null) {
      newState.isConfirmed = store.isConfirmed;
    }

    this.updateState(newState);
  }

  render() {
    return (
      <div>
        <Panel panelStyle="Medium">
          <Layout layoutStyle="LayoutGray">
            <Title>{strings.title}</Title>
          </Layout>
          <Layout layoutStyle="LayoutLight">
            <hr className="Overlay" />
            <Button buttonStyle="Blue Spaced Auto TextWhite" label={strings.btnPasswd} onCallback={this.editPasswordCtrl.toggle} />
            <Button buttonStyle="Blue Spaced Auto TextWhite" label={strings.btnEmail} onCallback={this.editEmailCtrl.toggle} />
            {
              this.state.isConfirmed === false &&
                <Information infoStyle="Alert">{strings.msgConfirmEmail}</Information>
            }
            <Button buttonStyle="Red Spaced Auto TextWhite LineSpaced" label={strings.btnDelete} onCallback={this.deleteCtrl.toggle} />
          </Layout>
        </Panel>

        <EditPassword controller={this.editPasswordCtrl} />
        <EditEmail controller={this.editEmailCtrl} />
        <QueryModal
          controller={this.deleteCtrl}
          query={strings.deleteConfirm}
          onConfirm={
            function confirm() {
              AuthActions.logout();
              UserActions.delete.defer();
            }
          }
        />
      </div>
    );
  }
}
