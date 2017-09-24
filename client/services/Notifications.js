import NotificationsActions from 'actions/Notifications.js';
import PromiseApi from 'services/PromiseApi.js';


export default class NotificationsApi {

  static get() {
    PromiseApi.auth().get('/notifications/')
      .then((res) => {
        if (res.error) {
          NotificationsActions.error(res.error);
        } else {
          NotificationsActions.getSuccess(res);
        }
      })
      .catch((err) => {
        NotificationsActions.error(err);
      });
  }

  static hasUnread() {
    PromiseApi.auth().get('/notifications/hasUnread')
      .then((res) => {
        if (res.error) {
          NotificationsActions.error(res.error);
        } else {
          NotificationsActions.hasUnread(res);
        }
      })
      .catch((err) => {
        NotificationsActions.error(err);
      });
  }

  static readAll() {
    PromiseApi.auth().put('/notifications/read')
      .then((res) => {
        if (res.error) {
          NotificationsActions.error(res.error);
        }
      })
      .catch((err) => {
        NotificationsActions.error(err);
      });
  }

}
