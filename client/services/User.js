import UserActions from 'actions/User.js';
import ProfileActions from 'actions/Profile.js';
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

  static becomeGuide(updateProfileForm) {
    PromiseApi.auth().post('/users/become-guide', updateProfileForm)
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

  static delete() {
    PromiseApi.auth().delete('/users')
      .then((res) => {
        if (res.error) {
          UserActions.error(res.error);
        } else {
          UserActions.invalidateUser();
        }
      })
      .catch((err) => {
        UserActions.error(err);
      });
  }

}
