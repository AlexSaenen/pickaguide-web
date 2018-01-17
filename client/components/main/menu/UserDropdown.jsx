import React from 'react';
import { Link } from 'react-router';

import AuthActions from 'actions/Auth.js';
import AvatarStore from 'stores/user/Avatar.js';
import NotificationsStore from 'stores/user/Notifications.js';
import { AuthDependent } from 'base/AuthDependent.jsx';
import { GuideDependent } from 'base/GuideDependent.jsx';
import { BlockDependent } from 'base/BlockDependent.jsx';
import { StoreObserver } from 'base/StoreObserver.jsx';
import { QueryModal } from 'modals/QueryModal.jsx';
import { NotificationIndicator } from 'layout/elements/NotificationIndicator.jsx';
import { ModalController } from 'base/ModalController.jsx';
import { strings } from './UserDropdown_lang.js';
import UserActions from 'actions/User.js';


import 'scss/main/menu/main.scss';


export class UserDropdown extends StoreObserver {

  constructor(props, context) {
    super(props, context, [AvatarStore, NotificationsStore]);

    this.state = { src: AvatarStore.getState().avatar };
    this.ctrl = new ModalController();
    AuthActions.sync();
  }

  onStore(store) {
    const newState = Object.assign({}, this.state);

    if (store.avatar) {
      newState.src = store.avatar;
      this.setState(newState);
    } else {
      newState.hasNotifs = store.hasUnread;
      this.setState(newState);
    }
  }

  render() {
    return (
      <AuthDependent className="AccountLogo" {...this.props}>
        <Link to="/profiles/mine">
          {
            this.state.src !== '' &&
              <img src={this.state.src} alt={strings.imgAlt} />
          }
        </Link>
        {
          this.state.hasNotifs &&
            <NotificationIndicator />
        }

        <div className="Dropdown HeightNone">
          <BlockDependent free>
            <Link to="/notifications"><p>Notifications</p></Link>
            <Link to="/accounts/mine"><p>{strings.account}</p></Link>
            <Link to="/profiles/mine"><p>{strings.profile}</p></Link>

            <GuideDependent guide>
              <Link to="/guide/adverts"><p>{strings.adverts}</p></Link>
            </GuideDependent>

            <Link to="/visits"><p>{strings.visits}</p></Link>
            <Link to="/travelbook"><p>{strings.travelbook}</p></Link>
            <Link to="/transactions"><p>Transactions</p></Link>

            <GuideDependent guide>
              <Link><p className="alert Clickable" onClick={this.ctrl.toggle}>{strings.retire}</p></Link>
            </GuideDependent>

            <GuideDependent visitor>
              <Link to="/guide/become"><p className="action">{strings.beAGuide}</p></Link>
            </GuideDependent>
          </BlockDependent>

          <BlockDependent block>
            <Link to="/visits/review"><p className="action">{strings.review}</p></Link>
          </BlockDependent>
        </div>

        <QueryModal
          modalStyle="Medium"
          controller={this.ctrl}
          query={strings.query}
          onConfirm={UserActions.retire}
        />
      </AuthDependent>
    );
  }
}
