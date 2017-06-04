import React from 'react';
import { Link } from 'react-router';

import AuthActions from 'actions/Auth.js';
import AvatarStore from 'stores/user/Avatar.js';
import { AuthDependent } from 'base/AuthDependent.jsx';
import { GuideDependent } from 'base/GuideDependent.jsx';
import { StoreObserver } from 'base/StoreObserver.jsx';
import { QueryModal } from 'modals/QueryModal.jsx';
import { ModalController } from 'base/ModalController.jsx';
import UserActions from 'actions/User.js';


import 'scss/main/menu/main.scss';


export class UserDropdown extends StoreObserver {

  constructor(props, context) {
    super(props, context, AvatarStore);

    this.state = { src: AvatarStore.getState().avatar };
    this.ctrl = new ModalController();
    AuthActions.sync();
  }

  onStore(store) {
    const newState = Object.assign({}, this.state);

    if (store.avatar) {
      newState.src = store.avatar;
      this.updateState(newState);
    }
  }

  render() {
    return (
      <AuthDependent className="AccountLogo" {...this.props}>
        <Link to="/profiles/mine">
          <img src={this.state.src} alt="Profile" />
        </Link>

        <div className="Dropdown HeightNone">
          <Link to="/accounts/mine/edit"><p>Account</p></Link>
          <Link to="/profiles/mine/edit"><p>Profile</p></Link>
          <Link to="/visits"><p>Visits</p></Link>

          <GuideDependent guide>
            <Link to="/guide/adverts"><p>Adverts</p></Link>
            <Link><p className="alert Clickable" onClick={this.ctrl.toggle}>Retire</p></Link>
          </GuideDependent>

          <GuideDependent visitor>
            <Link to="/guide/become"><p className="action">Be a guide</p></Link>
          </GuideDependent>
        </div>

        <QueryModal
          modalStyle="Medium"
          controller={this.ctrl}
          query="Do you really wish to retire from being a guide? All your adverts will be deactivated and ongoing visits cancelled"
          onConfirm={UserActions.retire}
        />
      </AuthDependent>
    );
  }
}
