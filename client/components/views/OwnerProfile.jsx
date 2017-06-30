import React from 'react';

import { Profile } from 'views/Profile.jsx';
import ProfileStore from 'stores/user/Profile.js';
import AvatarStore from 'stores/user/Avatar.js';
import AccountStore from 'stores/user/Account.js';
import ProfileActions from 'actions/Profile.js';


export class OwnerProfile extends Profile {

  constructor(props, context) {
    super(props, context, [ProfileStore, AvatarStore, AccountStore]);

    this.state = {
      profile: ProfileStore.getState().profile,
      avatar: AvatarStore.getState().avatar,
      isConfirmed: AccountStore.getState().isConfirmed,
    };

    this.isOwnerView = true;

    if (this.state.profile) {
      this.state.profile.displayName = `${this.state.profile.firstName} ${this.state.profile.lastName}`;
    }
  }

  componentDidMount() {
    super.componentDidMount();
    if (this.state.profile === null) {
      ProfileActions.get();
    }
  }
}

OwnerProfile.propTypes = {
  params: React.PropTypes.object,
};
