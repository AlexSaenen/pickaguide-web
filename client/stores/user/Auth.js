import { browserHistory } from 'react-router';

import alt from 'client/alt';
import AuthActions from 'actions/Auth.js';
import ProfileActions from 'actions/Profile.js';
import UserActions from 'actions/User.js';
import AccountActions from 'actions/Account.js';
import BlockActions from 'actions/Block.js';
import AvatarActions from 'actions/Avatar.js';
import NotificationsActions from 'actions/Notifications.js';
import AuthApi from 'services/Auth.js';
import CookieApi from 'services/Cookie.js';


class AuthStore {

  constructor() {
    this.error = null;
    this.credentials = null;
    this.notifFetcher = null;

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
      UserActions.isGuide.defer(this.credentials.id);
      AccountActions.get.defer();
      AccountActions.isConfirmed.defer(this.credentials.id);
      BlockActions.isBlocking.defer();

      if (this.notifFetcher) {
        clearInterval(this.notifFetcher);
      }

      NotificationsActions.getUnread.defer();
      this.notifFetcher = setInterval(NotificationsActions.getUnread.defer, 2 * 1000);
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
    browserHistory.goBack();
  }

  onError(error) {
    this.error = error;
  }

  onLogout(isDeleted = false) {
    browserHistory.push('/');
    CookieApi.revokeAll();
    ProfileActions.invalidateProfile.defer();
    AccountActions.invalidateAccount.defer();
    AvatarActions.invalidateAvatar.defer();
    UserActions.invalidateUser.defer();

    if (this.notifFetcher) {
      clearInterval(this.notifFetcher);
      this.notifFetcher = null;
    }

    if (isDeleted === false) {
      AuthApi.logout();
    }

    this.credentials = null;
  }

  onLogoutSuccess() {
    this.error = null;
  }
}

export default alt.createStore(AuthStore, 'AuthStore');
