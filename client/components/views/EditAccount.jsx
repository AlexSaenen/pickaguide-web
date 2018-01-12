import React from 'react';

import { Layout } from 'layout/containers/Layout.jsx';
import { EditPassword } from 'modals/EditPassword.jsx';
import { EditEmail } from 'modals/EditEmail.jsx';
import { QueryModal } from 'modals/QueryModal.jsx';
import { DeleteAccount } from 'modals/DeleteAccount.jsx';
import { StoreObserver } from 'base/StoreObserver.jsx';
import { ModalFormController } from 'base/ModalFormController.jsx';
import { ModalController } from 'base/ModalController.jsx';
import { Title } from 'layout/elements/Title.jsx';
import { Information } from 'layout/elements/Information.jsx';
import { Button } from 'layout/elements/Button.jsx';
import { strings } from './EditAccount_lang.js';
import AccountStore from 'stores/user/Account.js';
import UserActions from 'actions/User.js';


export class EditAccount extends StoreObserver {

  constructor(props, context) {
    super(props, context, AccountStore);

    this.state = {
      isConfirmed: AccountStore.getState().isConfirmed,
      account: AccountStore.getState().account,
    };

    this.editPasswordCtrl = new ModalFormController();
    this.editEmailCtrl = new ModalFormController();
    this.deleteCtrl = new ModalFormController();
    this.queryCtrl = new ModalController();
  }

  onStore(store) {
    const newState = Object.assign({}, this.state);

    if (store.error == null) {
      newState.isConfirmed = store.isConfirmed;
      newState.account = store.account;
    }

    this.updateState(newState);
  }

  render() {
    return (
      <div>
        <Layout>
          <Title>{strings.title}</Title>
          {this.state.account &&
            <p className="MarginOne Italic">{this.state.account.email}</p>
          }
          {this.state.isConfirmed === false &&
            <Information infoStyle="Alert Small MarginAuto">{strings.msgConfirmEmail}</Information>
          }
        </Layout>
        <Layout>
          <hr className="Overlay" />

          <Layout layoutStyle="SoftShadowNonHover W30E MW90 MarginAuto">
            <Title>{strings.editTitle}</Title>
            <br className="Margin" />
            <Button buttonStyle="Blue Spaced Auto TextWhite" label={strings.btnPasswd} onCallback={this.editPasswordCtrl.toggle} />
            <Button buttonStyle="Blue Spaced Auto TextWhite" label={strings.btnEmail} onCallback={this.editEmailCtrl.toggle} />
            <Button buttonStyle="Red Spaced Auto TextWhite LineSpaced" label={strings.btnDelete} onCallback={this.queryCtrl.toggle} />
          </Layout>
        </Layout>

        <EditPassword controller={this.editPasswordCtrl} />
        <EditEmail controller={this.editEmailCtrl} />
        <QueryModal
          controller={this.queryCtrl}
          query={strings.deleteConfirm}
          onConfirm={this.deleteCtrl.toggle}
        />
        <DeleteAccount
          controller={this.deleteCtrl}
          onSubmit={
            function confirm(form) {
              UserActions.delete.defer(form);
            }
          }
        />
      </div>
    );
  }
}
