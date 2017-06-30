import { browserHistory } from 'react-router';

import alt from 'client/alt';
import AuthActions from 'actions/Auth.js';
import ProfileActions from 'actions/Profile.js';
import UserActions from 'actions/User.js';
import AccountActions from 'actions/Account.js';
import AvatarActions from 'actions/Avatar.js';
import AuthApi from 'services/Auth.js';
import CookieApi from 'services/Cookie.js';


class AuthStore {

  constructor() {
    this.error = null;
    this.credentials = null;

    this.bindActions(AuthActions);

    if (CookieApi.isEmpty() === false) {
      this.credentials = {
        token: CookieApi.get('userToken'),
        id: CookieApi.get('userId'),
      };
    }
  }

  onSync() {
    if (this.credentials) {
      UserActions.isGuide.defer(this.credentials.id);
      AccountActions.get.defer();
      AccountActions.isConfirmed.defer(this.credentials.id);
      AvatarActions.get.defer(this.credentials.id);
    }

    return false;
  }

  onLogin(form) {
    AuthApi.login(form);
    return false;
  }

  onLoginSuccess(credentials) {
    this.error = null;
    this.credentials = credentials;
    browserHistory.push('/');
  }

  onError(error) {
    this.error = error;
  }

  onLogout() {
    browserHistory.push('/');
    CookieApi.revokeAll();
    ProfileActions.invalidateProfile.defer();
    AccountActions.invalidateAccount.defer();
    AvatarActions.invalidateAvatar.defer();
    AuthApi.logout();
    this.credentials = null;
  }

  onLogoutSuccess() {
    this.error = null;
  }
}

export default alt.createStore(AuthStore, 'AuthStore');
