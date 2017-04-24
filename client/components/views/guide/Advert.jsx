import React from 'react';
// import { browserHistory } from 'react-router';

import { StoreObserver } from 'base/StoreObserver.jsx';
import { Title } from 'layout/elements/Title.jsx';
import { Layout } from 'layout/containers/Layout.jsx';
import AdvertsStore from 'stores/user/Adverts.js';

import 'scss/views/adverts.scss';


export class Advert extends StoreObserver {

  constructor(props, context) {
    super(props, context, AdvertsStore);

    this.state = { advert: AdvertsStore.getState().specificAdvert };
  }

  onStore(store) {
    const newState = Object.assign({}, this.state);
    newState.advert = store.specificAdvert;
    this.setState(newState);
  }

  render() {
    const advert = this.state.advert;

    if (advert.photoUrl === undefined) {
      advert.photoUrl = 'http://www.freeiconspng.com/free-images/no-image-icon-23492';
      advert.active = false;
    }

    return (
      <div className="Advert">
        <Layout layoutStyle="LayoutLight">
          <hr className="Overlay" />

          <Title>{advert.title}</Title>
        </Layout>
      </div>
    );
  }
}
