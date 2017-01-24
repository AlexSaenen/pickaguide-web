import React from 'react';
import { Link } from 'react-router';

import ProfileStore from '../../stores/Profile.js';
import { AuthDependent } from '../AuthDependent.jsx';
import { StoreObserver } from '../base/StoreObserver.jsx';

import 'scss/components/menu/_mainMenu.scss';

export class ProfilePicture extends StoreObserver {
  constructor(props, context) {
    super(props, context, ProfileStore);

    const profile = ProfileStore.getState().profile || { photoUrl: '' };
    this.state = { url: profile.photoUrl };
    this.onChange = this.onChange.bind(this);
    this.props = props;
  }

  onChange(store) {
    const stateCopy = Object.assign({}, this.state);

    if (store.profile) {
      stateCopy.url = store.profile.photoUrl;
      this._alterState(stateCopy);
    }
  }

  render() {
    return (
      <AuthDependent className="AccountLogo" {...this.props}>
        <Link to={'/profile'}>
          <img src={this.state.url} alt="Profile" />
        </Link>
      </AuthDependent>
    );
  }
}
