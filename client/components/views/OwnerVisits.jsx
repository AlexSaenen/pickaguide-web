import React from 'react';
import { browserHistory } from 'react-router';

import { StoreObserver } from 'base/StoreObserver.jsx';
import { Title } from 'layout/elements/Title.jsx';
import { Text } from 'layout/elements/Text.jsx';
import { PanelList } from 'view/PanelList.jsx';
import { OwnerVisitPreview } from 'layout/user/OwnerVisitPreview.jsx';
import { GuideVisitPreview } from 'layout/user/GuideVisitPreview.jsx';
import { Layout } from 'layout/containers/Layout.jsx';
import { FeedableModalFormController } from 'base/FeedableModalFormController.jsx';
import { Button } from 'layout/elements/Button.jsx';
import { ChangeStatus } from 'modals/ChangeStatus.jsx';
import VisitsStore from 'stores/user/Visits.js';
import VisitsActions from 'actions/Visits.js';


export class OwnerVisits extends StoreObserver {

  constructor(props, context) {
    super(props, context, VisitsStore);

    this.state.myVisits = [];
    this.state.theirVisits = [];
    this.actionCtrl = new FeedableModalFormController();
    this.goToVisit = this.goToVisit.bind(this);
  }

  goToVisit(visitId, type) {
    browserHistory.push(`/visits/mine/${type}/${visitId}`);
  }

  componentDidMount() {
    super.componentDidMount();
    VisitsActions.get();
  }

  onStore(store) {
    const newState = Object.assign({}, this.state);
    newState.myVisits = store.myVisits;
    newState.theirVisits = store.theirVisits;
    this.setState(newState);
  }

  render() {
    const myVisits = this.state.myVisits;
    const theirVisits = this.state.theirVisits;

    return (
      <div>
        <Layout layoutStyle="LayoutLight">
          <Title>Visits</Title>
          <Button
            buttonStyle="Blue Auto"
            label="Refresh"
            onCallback={VisitsActions.get}
          />
        </Layout>

        {
          myVisits.length === 0 && theirVisits.length === 0 &&
            <Layout layoutStyle="LayoutBlank">
              <hr className="Overlay" />
              <Text>You have no Visits at this time ..</Text>
            </Layout>
        }

        {
          myVisits.length > 0 &&
            <Layout>
              <hr className="Overlay" />
              <Title>Your visits as a traveler ...</Title>
              <PanelList layoutStyle="LayoutLight" panelStyle="Wide OuterTight" listStyle="ListGrid" elementStyle="Auto Tight Clickable">
                {
                  myVisits.map((visit, index) => {
                    return <OwnerVisitPreview {...visit} key={index} actionCtrl={this.actionCtrl} onClick={this.goToVisit} />;
                  })
                }
              </PanelList>
            </Layout>
        }

        {
          theirVisits.length > 0 &&
            <Layout>
              {
                myVisits.length === 0 &&
                  <hr className="Overlay" />
              }
              <Title>Your visits with travelers ...</Title>
              <PanelList layoutStyle="LayoutLight" panelStyle="Wide OuterTight" listStyle="ListGrid" elementStyle="Auto Tight Clickable">
                {
                  theirVisits.map((visit, index) => {
                    return <GuideVisitPreview {...visit} key={index} actionCtrl={this.actionCtrl} onClick={this.goToVisit} />;
                  })
                }
              </PanelList>
            </Layout>
        }

        <ChangeStatus controller={this.actionCtrl} />
      </div>
    );
  }
}
