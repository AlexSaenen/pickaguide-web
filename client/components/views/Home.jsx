import React from 'react';
import { browserHistory } from 'react-router';

import { Title } from 'layout/elements/Title.jsx';
import { Information } from 'layout/elements/Information.jsx';
import { Layout } from 'layout/containers/Layout.jsx';
import { PanelLayout } from 'view/PanelLayout.jsx';
import { strings } from './Home_lang.js';
import { Text } from 'layout/elements/Text.jsx';
import { List } from 'layout/list/List.jsx';
import { StoreObserver } from 'base/StoreObserver.jsx';
import AdvertsStore from 'stores/user/Adverts.js';
import AdvertsActions from 'actions/Adverts.js';
import { PanelList } from 'view/PanelList.jsx';
import { AdvertPreview } from 'layout/user/AdvertPreview.jsx';

export class Home extends StoreObserver {

  constructor(props, context) {
    super(props, context, AdvertsStore);

    this.state.adverts = [];
    this.navigateToAdvert = this.navigateToAdvert.bind(this);
  }

  onStore(store) {
    const newState = Object.assign({}, this.state);

    if (store.error) {
      newState.error = store.error;
    } else {
      newState.adverts = store.adverts;
      newState.error = null;
    }

    this.updateState(newState);
  }

  componentDidMount() {
    super.componentDidMount();
    if (this.state.adverts.length === 0) {
      AdvertsActions.findAll.defer();
    }
  }

  navigateToAdvert(advertId) {
    browserHistory.push(`/guide/adverts/${advertId}`);
  }

  render() {
    const adverts = this.state.adverts || [];

    return (
      <div>
        <List elementStyle="Tight" listStyle="ListGrid">
          {
            adverts.length > 0 ?
            <PanelList elementStyle="Tight Clickable">
              {
                adverts.map((advert, index) => {
                  return (
                    <AdvertPreview
                      {...advert}
                      key={index}
                      onClick={this.navigateToAdvert}
                    />
                  );
                })
              }
            </PanelList>
            :
            <Layout layoutStyle="LayoutBlank">
              <hr className="Overlay" />
              <Text>No Adverts available for now ..</Text>
            </Layout>
          }
          <Layout layoutstyle="LayoutHomeRight">
            <Title>Maps</Title>
          </Layout>
        </List>
      </div>
    );
  }
}

export default Home;
