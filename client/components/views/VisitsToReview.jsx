import React from 'react';

import { StoreObserver } from 'base/StoreObserver.jsx';
import { Title } from 'layout/elements/Title.jsx';
import { Information } from 'layout/elements/Information.jsx';
import { Text } from 'layout/elements/Text.jsx';
import { Loader } from 'layout/elements/Loader.jsx';
import { Layout } from 'layout/containers/Layout.jsx';
import { List } from 'layout/list/List.jsx';
import { VisitToReview } from 'layout/user/VisitToReview.jsx';
import VisitsStore from 'stores/user/Visits.js';
import VisitsActions from 'actions/Visits.js';


export class VisitsToReview extends StoreObserver {

  constructor(props, context) {
    super(props, context, VisitsStore);

    this.state.myVisits = null;
    this.state.theirVisits = null;
  }

  componentDidMount() {
    super.componentDidMount();
    VisitsActions.getUnreviewed();
  }

  onStore(store) {
    const newState = Object.assign({}, this.state);

    if (store.error === null) {
      newState.myVisits = store.myVisits;
      newState.theirVisits = store.theirVisits;
      this.setState(newState);
    }
  }

  render() {
    const myVisits = this.state.myVisits;
    const theirVisits = this.state.theirVisits;

    return (
      <div>
        <Layout layoutStyle="LayoutLight">
          <Title>Review your visits</Title>
          {
            !(myVisits && theirVisits && myVisits.length === 0 && theirVisits.length === 0) &&
              <Information infoStyle="Medium MarginAuto Warning">You need to review all your visits to continue using our services</Information>
          }
        </Layout>

        {
          myVisits && theirVisits && myVisits.length === 0 && theirVisits.length === 0 &&
            <Layout layoutStyle="LayoutBlank">
              <hr className="Overlay" />
              <Text>You have no Visits to review</Text>
            </Layout>
        }
        {
          (myVisits === null || theirVisits === null) &&
            <Layout layoutStyle="LayoutBlank">
              <hr className="Overlay" />
              <Loader />
            </Layout>
        }
        {
          myVisits && myVisits.length > 0 &&
            <Layout>
              <hr className="Overlay" />
              <Title>Your visits as a traveler ...</Title>
              <List layoutStyle="LayoutLight" elementStyle="Tight AutoWidthContent MarginAuto">
                {
                  myVisits.map((visit, index) => {
                    return <VisitToReview key={index} {...visit} />;
                  })
                }
              </List>
            </Layout>
        }
        {
          theirVisits && theirVisits.length > 0 &&
            <Layout>
              {
                myVisits.length === 0 &&
                  <hr className="Overlay" />
              }
              <Title>Your visits with travelers ...</Title>
              <List layoutStyle="LayoutLight" elementStyle="Tight AutoWidthContent MarginAuto">
                {
                  theirVisits.map((visit, index) => {
                    return <VisitToReview key={index} {...visit} />;
                  })
                }
              </List>
            </Layout>
        }
      </div>
    );
  }
}
