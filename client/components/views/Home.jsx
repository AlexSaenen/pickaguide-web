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
import { Button } from 'layout/elements/Button.jsx';
import { Text } from 'layout/elements/Text.jsx';
import { Title } from 'layout/elements/Title.jsx';
import { Information } from 'layout/elements/Information.jsx';
import SimpleMap from 'layout/user/GoogleMap.jsx';
import BlockStore from 'stores/user/Block.js';
import AuthStore from 'stores/user/Auth.js';
import { strings } from './Home_lang.js'

import { Guides } from './Home';

import 'scss/views/home.scss';


export class Home extends StoreObserver {

  constructor(props, context) {
    super(props, context, [BlockStore, AdvertsStore]);

    this.state = { adverts: null, isBlocking: BlockStore.getState().isBlocking };
    this.navigateToAdvert = this.navigateToAdvert.bind(this);
    this.renderAdverts = this.renderAdverts.bind(this);
    this.renderMap = this.renderMap.bind(this);
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

  renderAdverts() {
    const adverts = this.state.adverts;

    return (adverts === null || adverts.length > 0) &&
      <Element elementStyle="Tight WidthFull AllowOverflow Transparent NoWrap">
        {
          adverts ?
            <List elementStyle="Tight NoHorizontalWrap Auto Clickable" listStyle="WidthFull">
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
      </Element>;
  }

  renderMap() {
    return (AuthStore.getState().credentials !== null && this.state.isBlocking === false) &&
      <Element elementStyle="Tight NoHorizontalWrap Clickable Height30 Map">
        <SimpleMap zoom={12} />
      </Element>;
  }

  navigateToAdvert(advertId) {
    browserHistory.push(`/guide/adverts/${advertId}`);
  }

  navigateToAllAdverts() {
    browserHistory.push('/view-all-adverts');
  }

  render() {
    return (
      <div className="HomeContainer">
        <Layout>
          <Title>{strings.title}</Title>
          <p className="Italic">{strings.slogan}</p>
        </Layout>

        <Layout>
          <hr className="Overlay" />
        </Layout>

        <AuthDependent unauth>
          <List wrapChildren={false}>
            <Element elementStyle="Tight NoWrap">
              <Layout layoutStyle="LayoutRegular SoftShadowNonHover">
                <Text>
                  <p dangerouslySetInnerHTML={{ __html: strings.desc1 }} / >
                  <p dangerouslySetInnerHTML={{ __html: strings.desc2 }} / >
                  <p dangerouslySetInnerHTML={{ __html: strings.desc3 }} / >
                </Text>
              </Layout>
            </Element>
            <Element elementStyle="Tight Transparent NoWrap">

              <Information infoStyle="Info Auto MarginAuto LineSpaced">
                {strings.infoLogin1}<Link to="/login">{strings.infoLogin2}</Link>{strings.infoLogin3}<Link to="/signup">{strings.infoLogin4}</Link>{strings.infoLogin5}
              </Information>

            </Element>
          </List>
        </AuthDependent>

        <List wrapChildren={false} listStyle="ListGrid">
          <Guides />

          <Element elementStyle="W85 NoWrap Box Top Transparent">
            <List wrapChildren={false} listStyle="Tight NoWrap ListStack WidthFull">
              {
                (AuthStore.getState().credentials !== null && this.state.isBlocking === false) &&

                  <Element elementStyle="Tight NoWrap">
                    <Layout layoutStyle="LayoutRegular SoftShadowNonHover">
                      <p dangerouslySetInnerHTML={{ __html: strings.visitMap }} / >
                    </Layout>
                  </Element>
              }
              {this.renderMap()}
              {this.renderAdverts()}

              <Element elementStyle="Auto Transparent Tight">
                <Button label={strings.exploreVisit} onCallback={this.navigateToAllAdverts} buttonStyle="Auto Blue TextWhite AllSpaced" />
              </Element>
            </List>
          </Element>
        </List>
      </div>
    );
  }
}

export default Home;
