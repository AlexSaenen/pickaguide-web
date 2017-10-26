import React from 'react';
import { browserHistory } from 'react-router';

import { Layout } from 'layout/containers/Layout.jsx';
import { List } from 'layout/list/List.jsx';
import { StoreObserver } from 'base/StoreObserver.jsx';
import AdvertsStore from 'stores/user/Adverts.js';
import AdvertsActions from 'actions/Adverts.js';
import { Element } from 'layout/list/Element.jsx';
import { AdvertPreview } from 'layout/user/AdvertPreview.jsx';
import { Loader } from 'layout/elements/Loader.jsx';

import 'scss/views/home.scss';


export class AllAdverts extends StoreObserver {

  constructor(props, context) {
    super(props, context, AdvertsStore);

    this.state = { adverts: null };
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
        <List wrapChildren={false} listStyle="ListGrid">
          {
            (adverts === null || adverts.length > 0) &&
              <Element elementStyle="Tight Half Transparent NoWrap">
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
        </List>
      </div>
    );
  }
}

export default AllAdverts;
