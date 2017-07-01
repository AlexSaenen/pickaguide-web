import React from 'react';
import { browserHistory } from 'react-router';

import { Title } from 'layout/elements/Title.jsx';
import { Layout } from 'layout/containers/Layout.jsx';
import { Text } from 'layout/elements/Text.jsx';
import { List } from 'layout/list/List.jsx';
import { StoreObserver } from 'base/StoreObserver.jsx';
import AdvertsStore from 'stores/user/Adverts.js';
import AdvertsActions from 'actions/Adverts.js';
import { Element } from 'layout/list/Element.jsx';
import { AdvertPreview } from 'layout/user/AdvertPreview.jsx';
import SimpleMap from 'layout/user/GoogleMap.jsx';

import 'scss/views/home.scss';


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
    const coor = { lat: 43.79831666667667, lng: 0.625195 };

    return (
      <div className="HomeContainer">
        <List wrapChildren={false} listStyle="ListGrid">
          <Element elementStyle="Tight Half Transparent NoWrap">
            {
              adverts.length > 0 ?
                <List elementStyle="Tight Auto Clickable" listStyle="WidthFull">
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
                </List>
              :
                <Layout layoutStyle="LayoutBlank">
                  <hr className="Overlay" />
                  <Text>No Adverts available for now ..</Text>
                </Layout>
            }
          </Element>
          <Element elementStyle="Tight Half Transparent NoHorizontalWrap Top Clickable Height30">
            <SimpleMap center={coor} zoom={9} />
          </Element>
        </List>
      </div>
    );
  }
}

export default Home;
