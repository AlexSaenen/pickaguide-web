import React from 'react';
// import { browserHistory } from 'react-router';

import { StoreObserver } from 'base/StoreObserver.jsx';
import { Title } from 'layout/elements/Title.jsx';
import { Text } from 'layout/elements/Text.jsx';
import { CheckMark } from 'layout/elements/CheckMark.jsx';
import { Picture } from 'layout/elements/Picture.jsx';
import { Layout } from 'layout/containers/Layout.jsx';
import { Panel } from 'layout/containers/Panel.jsx';
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
      advert.owner = { profile: {} };
    }

    return (
      <div className="Advert">
        <Layout layoutStyle="LayoutLight">
          <hr className="Overlay" />

          <Title>{advert.title}</Title>
          <p className="Small Italic">by {advert.owner.displayName}</p>
          <div className="LineContainer Small">
            <CheckMark active={advert.active} />
            <p className="Spaced Small Italic Bold Inline">for {advert.hourlyPrice}</p>
          </div>
          <Text>{advert.description}</Text>

          <hr className="SpacedDivider" />

          <Panel panelStyle="NoWrap">
            <Picture pictureName="Advert Cover" pictureType="WidthLimited" url={advert.photoUrl} />
          </Panel>
        </Layout>
      </div>
    );
  }
}
