import React from 'react';
import { Link } from 'react-router';

import AuthActions from 'actions/Auth.js';
import AvatarStore from 'stores/user/Avatar.js';
import { AuthDependent } from 'base/AuthDependent.jsx';
import { GuideDependent } from 'base/GuideDependent.jsx';
import { StoreObserver } from 'base/StoreObserver.jsx';
import { QueryModal } from 'modals/QueryModal.jsx';
import { ModalController } from 'base/ModalController.jsx';
import { strings } from './UserDropdown_lang.js';
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
          <img src={this.state.src} alt={strings.imgAlt} />
        </Link>

        <div className="Dropdown HeightNone">
          <Link to="/accounts/mine/edit"><p>{strings.account}</p></Link>
          <Link to="/profiles/mine/edit"><p>{strings.profile}</p></Link>

          <GuideDependent guide>
            <Link to="/guide/adverts"><p>{strings.adverts}</p></Link>
            <Link><p className="alert Clickable" onClick={this.ctrl.toggle}>{strings.retire}</p></Link>
          </GuideDependent>

          <GuideDependent visitor>
            <Link to="/guide/become"><p className="action">{strings.beAGuide}</p></Link>
          </GuideDependent>
        </div>

        <QueryModal
          controller={this.ctrl}
          query={strings.query}
          onConfirm={UserActions.retire}
        />
      </AuthDependent>
    );
  }
}
