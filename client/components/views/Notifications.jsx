import React from 'react';

import { StoreObserver } from 'base/StoreObserver.jsx';
import NotificationsActions from 'actions/Notifications.js';
import NotificationsStore from 'stores/user/Notifications.js';
import { Layout } from 'layout/containers/Layout.jsx';
import { Message } from 'layout/elements/Message.jsx';
import { Information } from 'layout/elements/Information.jsx';
import { Loader } from 'layout/elements/Loader.jsx';
import { strings } from './Search_lang.js';
import { stringsNotif } from './Notifications.lang.js';

export class Notifications extends StoreObserver {

  constructor(props, context) {
    super(props, context, NotificationsStore);

    this.state = {
      notifs: null,
      error: null,
    };
  }

  componentDidMount() {
    super.componentDidMount();
    if (this.state.notifs === null) {
      NotificationsActions.get.defer();
    }
  }

  onStore(store) {
    if (store.error) {
      this.setState({ notifs: [], error: store.error });
    } else {
      if (store.notifs.filter(notif => notif.readAt === null).length > 0) {
        NotificationsActions.readAll.defer();
      }

      this.setState({ notifs: store.notifs, error: null });
    }
  }

  render() {
    const notifs = this.state.notifs;

    if (this.state.error) {
      const message = {
        title: String(strings.error),
        content: String(this.state.error),
        type: 'Alert',
      };

      return (
        <Layout layoutStyle="LayoutBlank">
          <Message messageStyle="Medium" {...message} timed={false} />
        </Layout>
      );
    }

    if (notifs === null) {
      return (
        <Layout layoutStyle="LayoutBlank">
          <Loader />
        </Layout>
      );
    }

    if (notifs.length === 0) {
      return (
        <Layout layoutStyle="LayoutBlank">
          <Information infoStyle="Info Small MarginAuto LineSpaced">{stringsNotif.noNotifications}</Information>
        </Layout>
      );
    }

    return (
      <Layout layoutStyle="LayoutBlank">
        {
          notifs.map((notif, index) => {
            return (
              <div key={index}>
                <Message
                  title={notif.title}
                  content={notif.body}
                  type="Notif"
                  time={false}
                  messageStyle="Medium MarginAuto"
                />
                <br />
              </div>
            );
          })
        }
      </Layout>
    );
  }
}
