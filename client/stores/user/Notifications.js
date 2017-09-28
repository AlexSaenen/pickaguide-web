import alt from 'client/alt';
import NotificationsActions from 'actions/Notifications.js';
import NotificationApi from 'services/Notifications.js';


class NotificationsStore {

  constructor() {
    this.error = null;
    this.notifs = null;
    this.hasUnread = false;
    this.bindActions(NotificationsActions);
  }

  onGet() {
    NotificationApi.get();
    return false;
  }

  onGetSuccess(notifs) {
    this.error = null;
    this.notifs = notifs;
    this.hasUnread = notifs.filter(notif => notif.readAt === null).length > 0;
  }

  onError(error) {
    this.error = error;
  }

  onGetUnread() {
    NotificationApi.hasUnread();
    return false;
  }

  onHasUnread(response) {
    this.error = null;
    this.hasUnread = response.hasUnread;
  }

  onReadAll() {
    NotificationApi.readAll();
    return false;
  }

}

export default alt.createStore(NotificationsStore, 'NotificationsStore');
