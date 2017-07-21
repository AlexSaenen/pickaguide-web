import UserActions from 'actions/User.js';
import BlockActions from 'actions/Block.js';
import SearchUserActions from 'actions/SearchUser.js';
import ProfileActions from 'actions/Profile.js';
import AuthActions from 'actions/Auth.js';
import PromiseApi from 'services/PromiseApi.js';

export default class UserApi {

  static isGuide(userId) {
    PromiseApi.get(`/public/users/${userId}/isGuide`)
      .then((res) => {
        if (res.error) {
          UserActions.error(res.error);
        } else {
          UserActions.isGuideSuccess(res.isGuide);
        }
      })
      .catch((err) => {
        UserActions.error(err);
      });
  }

  static isBlocking() {
    PromiseApi.auth().get('/users/isBlocking')
      .then((res) => {
        if (res.error) {
          BlockActions.error(res.error);
        } else {
          BlockActions.isBlockingSuccess(res.isBlocking);
        }
      })
      .catch((err) => {
        BlockActions.error(err);
      });
  }

  static isHeGuide(userId) {
    PromiseApi.get(`/public/users/${userId}/isGuide`)
      .then((res) => {
        if (res.error) {
          SearchUserActions.error(res.error);
        } else {
          SearchUserActions.isGuideSuccess(res.isGuide);
        }
      })
      .catch((err) => {
        SearchUserActions.error(err);
      });
  }

  static becomeGuide(updateProfileForm) {
    PromiseApi.auth().post('/users/becomeGuide', updateProfileForm)
      .then((res) => {
        if (res.error) {
          UserActions.error(res.error);
        } else {
          UserActions.isGuideSuccess(res.isGuide);
          ProfileActions.getSuccess.defer(res.profile);
        }
      })
      .catch((err) => {
        UserActions.error(err);
      });
  }

  static retire() {
    PromiseApi.auth().post('/users/retire')
      .then((res) => {
        if (res.error) {
          UserActions.error(res.error);
        } else {
          UserActions.isGuideSuccess(res.isGuide);
        }
      })
      .catch((err) => {
        UserActions.error(err);
      });
  }

  static delete(form) {
    PromiseApi.auth().put('/users/remove', form)
      .then((res) => {
        if (res.error) {
          UserActions.error(res.error);
        } else {
          AuthActions.logout(true);
        }
      })
      .catch((err) => {
        UserActions.error(err);
      });
  }

}
