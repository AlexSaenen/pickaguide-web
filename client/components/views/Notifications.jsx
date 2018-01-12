import React from 'react';
import { Link } from 'react-router';

import { StoreObserver } from 'base/StoreObserver.jsx';
import NotificationsActions from 'actions/Notifications.js';
import NotificationsStore from 'stores/user/Notifications.js';
import { Layout } from 'layout/containers/Layout.jsx';
import { Message } from 'layout/elements/Message.jsx';
import { Title } from 'layout/elements/Title.jsx';
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

    const wrapHeader = (body) => (
      <div>
        <Layout>
          <Title>Notifications</Title>
        </Layout>
        <Layout>
          <hr className="Overlay" />
          {body}
        </Layout>
      </div>
    );

    if (this.state.error) {
      const message = {
        title: String(strings.error),
        content: String(this.state.error),
        type: 'Alert',
      };

      return wrapHeader(<Message messageStyle="Medium" {...message} timed={false} />);
    }

    if (notifs === null) {
      return wrapHeader(<Loader />);
    }

    if (notifs.length === 0) {
      return wrapHeader(<Information infoStyle="Info Small MarginAuto LineSpaced">No notifications yet</Information>);
    }

    return wrapHeader(
      <Layout layoutStyle="LayoutBlank">
        {
          notifs.map((notif, index) => {
            const body = notif.body.split('.');
            const html = (<p>
              <Link to={`/profiles/${notif.by}`}>{body[0]}.</Link> {body[1]}
            </p>);

            const createdAt = new Date(notif.creationDate);

            return (
              <div key={index}>
                <Message
                  title={`${notif.title} on ${createdAt.toLocaleDateString()} at ${createdAt.toLocaleTimeString()}`}
                  content={html}
                  type="NeutralLight"
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
