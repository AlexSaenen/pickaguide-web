import React from 'react';
import { browserHistory } from 'react-router';

import { StoreObserver } from 'base/StoreObserver.jsx';
import { Title } from 'layout/elements/Title.jsx';
import { Text } from 'layout/elements/Text.jsx';
import { List } from 'layout/list/List.jsx';
import { Element } from 'layout/list/Element.jsx';
import { OwnerVisitPreview } from 'layout/user/OwnerVisitPreview.jsx';
import { GuideVisitPreview } from 'layout/user/GuideVisitPreview.jsx';
import { Layout } from 'layout/containers/Layout.jsx';
import { FeedableModalFormController } from 'base/FeedableModalFormController.jsx';
import { Button } from 'layout/elements/Button.jsx';
import { Loader } from 'layout/elements/Loader.jsx';
import { ChangeStatus } from 'modals/ChangeStatus.jsx';
import VisitsStore from 'stores/user/Visits.js';
import VisitsActions from 'actions/Visits.js';


export class OwnerVisits extends StoreObserver {

  constructor(props, context) {
    super(props, context, VisitsStore);

    this.state.myVisits = null;
    this.state.theirVisits = null;
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
        <Layout layoutStyle="LayoutBlank">
          <Title>Visits</Title>
          <Button
            buttonStyle="Blue Auto"
            label="Refresh"
            onCallback={VisitsActions.get}
          />
        </Layout>

        {
          myVisits && theirVisits && myVisits.length === 0 && theirVisits.length === 0 &&
            <Layout layoutStyle="LayoutBlank">
              <hr className="Overlay" />
              <Text>You have no Visits at this time ..</Text>
            </Layout>
        }
        {
          (myVisits === null || theirVisits === null) &&
            <Layout layoutStyle="LayoutBlank">
              <hr className="Overlay" />
              <Loader />
            </Layout>
        }
        <Layout layoutStyle="LayoutBlank">
          <hr className="Overlay" />

          <List listStyle="ListGrid" wrapChildren={false}>
            {
              myVisits && myVisits.length > 0 &&
                <Element elementStyle={`${theirVisits && theirVisits.length > 0 ? 'Half' : 'WidthFull'} Transparent NoWrap Top Box`}>
                  <Layout layoutStyle="LayoutBlank SoftShadowNonHover">
                    <Title>Your visits as a traveler ...</Title>
                    {
                      myVisits.map((visit, index) => {
                        return <OwnerVisitPreview {...visit} key={index} actionCtrl={this.actionCtrl} onClick={this.goToVisit} />;
                      })
                    }
                  </Layout>
                </Element>
            }
            {
              theirVisits && theirVisits.length > 0 &&
                <Element elementStyle={`${myVisits && myVisits.length > 0 ? 'Half' : 'WidthFull'} Transparent NoWrap Top Box`}>
                  <Layout layoutStyle="LayoutBlank SoftShadowNonHover">
                    <Title>Your visits with travelers ...</Title>
                    {
                      theirVisits.map((visit, index) => {
                        return <GuideVisitPreview {...visit} key={index} actionCtrl={this.actionCtrl} onClick={this.goToVisit} />;
                      })
                    }
                  </Layout>
                </Element>
            }
          </List>
        </Layout>

        <ChangeStatus controller={this.actionCtrl} />
      </div>
    );
  }
}
