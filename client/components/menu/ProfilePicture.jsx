import React from 'react';
import { Link } from 'react-router';

import AuthActions from 'actions/Auth.js';
import ProfileStore from 'stores/Profile.js';
import { AuthDependent } from 'components/AuthDependent.jsx';
import { StoreObserver } from 'base/StoreObserver.jsx';

import 'scss/components/menu/_mainMenu.scss';


export class ProfilePicture extends StoreObserver {

  constructor(props, context) {
    super(props, context, ProfileStore);

    const profile = ProfileStore.getState().profile || { photoUrl: '' };
    this.state = { url: profile.photoUrl };
    this.onStoreChange = this.onStoreChange.bind(this);
    AuthActions.sync();
  }

  onStoreChange(store) {
    const stateCopy = Object.assign({}, this.state);

    if (store.profile) {
      stateCopy.url = store.profile.photoUrl;
      this.updateState(stateCopy);
    }
  }

  render() {
    return (
      <AuthDependent className="AccountLogo" {...this.props}>
        <Link to="/profile">
          <img src={this.state.url} alt="Profile" />
        </Link>
        <div className="Dropdown HeightNone">
          <Link to="/settings"><p>Settings</p></Link>
          <Link to="/account"><p>Account</p></Link>
          <Link to="/profile"><p>Profile</p></Link>
        </div>
      </AuthDependent>
    );
  }
}
