import React from 'react';
import { browserHistory, Link } from 'react-router';

import { Layout } from 'layout/containers/Layout.jsx';
import { List } from 'layout/list/List.jsx';
import { StoreObserver } from 'base/StoreObserver.jsx';
import { AuthDependent } from 'base/AuthDependent.jsx';
import AdvertsStore from 'stores/user/Adverts.js';
import AdvertsActions from 'actions/Adverts.js';
import { Element } from 'layout/list/Element.jsx';
import { AdvertPreview } from 'layout/user/AdvertPreview.jsx';
import { Loader } from 'layout/elements/Loader.jsx';
import SimpleMap from 'layout/user/GoogleMap.jsx';
import BlockStore from 'stores/user/Block.js';
import AuthStore from 'stores/user/Auth.js';

import 'scss/views/home.scss';


export class Home extends StoreObserver {

  constructor(props, context) {
    super(props, context, [BlockStore, AdvertsStore]);

    this.state = { adverts: null, isBlocking: BlockStore.getState().isBlocking };
    this.navigateToAdvert = this.navigateToAdvert.bind(this);
  }

  onStore(store) {
    const newState = Object.assign({}, this.state);

    if (store.error) {
      newState.error = store.error;
    } else if (store.adverts !== undefined) {
      newState.adverts = store.adverts;
      newState.error = null;
    } else {
      newState.isBlocking = store.isBlocking;
    }

    this.setState(newState);
  }

  componentDidMount() {
    super.componentDidMount();
    if (this.state.adverts === null) {
      AdvertsActions.findMain.defer();
    }
  }

  navigateToAdvert(advertId) {
    browserHistory.push(`/guide/adverts/${advertId}`);
  }

  render() {
    const adverts = this.state.adverts;

    return (
      <div className="HomeContainer">


        <AuthDependent unauth>
          <List wrapChildren={false}>
            <Element elementStyle="Tight Transparent NoWrap"><Layout layoutStyle="LayoutLight"><p>Pickaguide is a service that allow you to discover a city, place through the eyes of a local.</p><p>Get a perfect local inhabitant wherever you are, whenever you want.</p><p>With Pickaguide, live a unique experience.</p></Layout></Element>
          </List>
        </AuthDependent>

        <List wrapChildren={false} listStyle="ListGrid">
          {
            (adverts === null || adverts.length > 0) &&
              <Element elementStyle="Tight Half Transparent NoWrap">
                <AuthDependent auth>
                  <Element elementStyle="Tight WidthFull Transparent NoWrap"><Layout layoutStyle="LayoutLight"><Link style={{ textDecoration: 'none', color: 'black' }} to="/view-all-adverts">Click here to view all adverts</Link></Layout></Element>
                </AuthDependent>
                {
                  adverts ?
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
                      <Loader />
                    </Layout>
                }
              </Element>
          }
          {
            (AuthStore.getState().credentials !== null && this.state.isBlocking === false) &&
              <Element elementStyle="Tight Half NoHorizontalWrap Top Clickable Height30">
                <SimpleMap zoom={12} />
              </Element>
          }
        </List>
      </div>
    );
  }
}

export default Home;
