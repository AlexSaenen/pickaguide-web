import React from 'react';
import { browserHistory } from 'react-router';

import { StoreObserver } from 'base/StoreObserver.jsx';
import { List } from 'layout/list/List.jsx';
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

    return (
      <div>
        {
          adverts && adverts.length > 0 &&
            <List elementStyle="Tight Clickable W40E MarginAuto" listStyle="WidthFull">
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
        }
      </div>
    );
  }
}

GuideAdvertsPreviews.propTypes = {
  userId: React.PropTypes.string.isRequired,
};
