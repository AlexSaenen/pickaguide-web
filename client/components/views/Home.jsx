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
          <Title>Pickaguide</Title>
          <p className="Italic">A way to visit places and meet people differently</p>
        </Layout>

        <Layout>
          <hr className="Overlay" />
        </Layout>

        <AuthDependent unauth>
          <List wrapChildren={false}>
            <Element elementStyle="Tight NoWrap">
              <Layout layoutStyle="LayoutRegular SoftShadowNonHover">
                <Text>
                  <p>Pickaguide is a service that allows you to <strong>genuinly discover</strong> a city or a place through the eyes of a <strong>local inhabitant</strong>.</p>
                  <p>Get a <strong>perfect visit</strong> wherever you are, whenever you want.</p>
                  <p>With Pickaguide, live a <strong>unique experience.</strong></p>
                </Text>
              </Layout>
            </Element>
            <Element elementStyle="Tight Transparent NoWrap">
              <Information infoStyle="Info Auto MarginAuto LineSpaced">
                You can access a Map with all <strong>available visits</strong> around you, you just need to <Link to="/login">log in</Link> or <Link to="/signup">create</Link> an account
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
                      <p>There might be some available <strong>visits around</strong> you, why don't you have a look on the Map below ?</p>
                    </Layout>
                  </Element>
              }
              {this.renderMap()}
              {this.renderAdverts()}

              <Element elementStyle="Auto Transparent Tight">
                <Button label="Explore all adverts available" onCallback={this.navigateToAllAdverts} buttonStyle="Auto Blue TextWhite AllSpaced" />
              </Element>
            </List>
          </Element>
        </List>
      </div>
    );
  }
}

export default Home;
