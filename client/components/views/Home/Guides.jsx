import React from 'react';
import { browserHistory } from 'react-router';

import { Layout } from 'layout/containers/Layout.jsx';
import { List } from 'layout/list/List.jsx';
import { StoreObserver } from 'base/StoreObserver.jsx';
import { AuthDependent } from 'base/AuthDependent.jsx';
import { Element } from 'layout/list/Element.jsx';
import { Loader } from 'layout/elements/Loader.jsx';
import AuthStore from 'stores/user/Auth.js';
import { Guide } from './Guide.jsx';
import AvatarApi from 'services/Avatar.js';

import LocationStore from 'stores/user/Location.js';
import LocationActions from 'actions/Location.js';

import 'scss/views/home.scss';


export class Guides extends StoreObserver {

  constructor(props, context) {
    super(props, context, LocationStore);

    this.state = { guides: LocationStore.guideCoor || null, avatars: [] };
  }

  onStore(store) {
    if (store.guideCoor !== undefined) {
      const guides = (store.guideCoor || []).filter(guide => guide._id !== AuthStore.getState().credentials.id);
      const ids = guides.map(guide => guide._id);

      AvatarApi.getAvatars(ids, [])
      .then(avatars => this.setState({ avatars, guides }));
    }
  }

  componentDidMount() {
    super.componentDidMount();
    LocationActions.nearGuide.defer();
  }

  navigateToProfile(userId) {
    browserHistory.push(`/profiles/${userId}`);
  }

  render() {
    const { guides, avatars } = this.state;

    return (guides === null || guides.length > 0) &&
      <Element elementStyle="W15 Transparent NoWrap Box">
        <AuthDependent auth>
          <Element elementStyle="Tight WidthFull NoWrap">
            <Layout layoutStyle="LayoutRegular SoftShadowNonHover">
              <p>Check out these <strong>guides</strong> near you</p>
            </Layout>
          </Element>

          {
            guides ?
              <List elementStyle="Tight MarginTop NoHorizontalWrap Auto Clickable" listStyle="WidthFull">
                {
                  guides.map((guide, index) => {
                    return (
                      <Guide
                        _id={guide._id}
                        firstName={guide.profile.firstName}
                        description={guide.profile.description}
                        rate={guide.profile.rate}
                        avatar={avatars[index]}
                        key={index}
                        onClick={this.navigateToProfile}
                      />
                    );
                  })
                }
              </List>
            :
              <Layout layoutStyle="LayoutBlank">
                <Loader />
              </Layout>
          }
        </AuthDependent>
      </Element>;
  }
}

export default Guides;
