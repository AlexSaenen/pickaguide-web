import React from 'react';
import { browserHistory } from 'react-router';

import { StoreObserver } from 'base/StoreObserver.jsx';
import { Layout } from 'layout/containers/Layout.jsx';
import { List } from 'layout/list/List.jsx';
import { Element } from 'layout/list/Element.jsx';
import { Loader } from 'layout/elements/Loader.jsx';
import { AdvertPreview } from 'layout/user/AdvertPreview.jsx';
import AdvertsActions from 'actions/Adverts.js';
import AdvertsStore from 'stores/user/Adverts.js';


export class GuideAdvertsPreviews extends StoreObserver {

  constructor(props, context) {
    super(props, context, AdvertsStore);

    this.userId = props.userId;
    this.state = { adverts: null };
    this.navigateToAdvert = this.navigateToAdvert.bind(this);
  }

  componentDidMount() {
    super.componentDidMount();
    if (this.state.adverts === null) {
      AdvertsActions.getFrom.defer(this.userId);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.userId === this.userId) { return; }

    this.userId = nextProps.userId;
    const nextState = Object.assign({}, this.state);
    nextState.adverts = null;

    this.setState(nextState);
  }

  onStore(store) {
    const newState = Object.assign({}, this.state);
    newState.adverts = store.adverts;
    this.setState(newState);
  }

  navigateToAdvert(advertId) {
    browserHistory.push(`/guide/adverts/${advertId}`);
  }

  render() {
    const adverts = this.state.adverts;

    if (adverts === null) {
      return (<Loader />);
    }

    if (adverts.length === 0) {
      return (<div />);
    }

    return (
      <Element elementStyle="W60 Transparent Top Box NoWrap">
        <Layout layoutStyle="LayoutBlank NoWrap">
          <List elementStyle="Tight MarginFour Clickable WidthFullImportant MarginAuto" listStyle="WidthFull">
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
        </Layout>
      </Element>
    );
  }
}

GuideAdvertsPreviews.propTypes = {
  userId: React.PropTypes.string.isRequired,
};
