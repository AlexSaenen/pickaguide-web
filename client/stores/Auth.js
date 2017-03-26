import { browserHistory } from 'react-router';

import alt from 'client/alt';
import AuthActions from 'actions/Auth.js';
import ProfileActions from 'actions/Profile.js';
import AccountActions from 'actions/Account.js';
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
      ProfileActions.get.defer();
      ProfileActions.isGuide.defer(this.credentials.id);
      AccountActions.get.defer();
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
    CookieApi.revoke();
    ProfileActions.invalidateProfile.defer();
    AccountActions.invalidateAccount.defer();
    AuthApi.logout();
    this.credentials = null;
  }

  onLogoutSuccess() {
    this.error = null;
    browserHistory.push('/');
  }
}

export default alt.createStore(AuthStore, 'AuthStore');
