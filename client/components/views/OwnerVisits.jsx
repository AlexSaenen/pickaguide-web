import React from 'react';
import { browserHistory, Link } from 'react-router';

import { StoreObserver } from 'base/StoreObserver.jsx';
import { Title } from 'layout/elements/Title.jsx';
import { Information } from 'layout/elements/Information.jsx';
import { List } from 'layout/list/List.jsx';
import { Element } from 'layout/list/Element.jsx';
import { OwnerVisitPreview } from 'layout/user/OwnerVisitPreview.jsx';
import { GuideVisitPreview } from 'layout/user/GuideVisitPreview.jsx';
import { Layout } from 'layout/containers/Layout.jsx';
import { FeedableModalFormController } from 'base/FeedableModalFormController.jsx';
import { Loader } from 'layout/elements/Loader.jsx';
import { ChangeStatus } from 'modals/ChangeStatus.jsx';
import { strings } from './OwnerVisits_lang.js'
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
          <Title>{strings.title}</Title>
        </Layout>

        {
          myVisits && theirVisits && myVisits.length === 0 && theirVisits.length === 0 &&
            <Layout layoutStyle="LayoutBlank">
              <hr className="Overlay" />
              <Information infoStyle="Info Small MarginAuto LineSpaced">{strings.noVisit}</Information>
              <Layout layoutStyle="LayoutRegular SoftShadowNonHover AutoWidthContent MarginAuto">
                <p>{strings.str1}<Link className="Blue Bold" to="/">{strings.str2}</Link>{strings.str3}<Link className="Blue Bold" to="/view-all-adverts">{strings.str4}</Link>{strings.str5}</p>
                <br />
                <p dangerouslySetInnerHTML={{ __html: strings.str6 }} / >
              </Layout>
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
          {
            !(myVisits && theirVisits && myVisits.length === 0 && theirVisits.length === 0) && !(myVisits === null || theirVisits === null) &&
              <hr className="Overlay" />
          }

          <List listStyle="ListGrid" wrapChildren={false}>
            {
              myVisits && myVisits.length > 0 &&
                <Element elementStyle={`${theirVisits && theirVisits.length > 0 ? 'Half' : 'WidthFullImportant'} Transparent NoWrap Top Box`}>
                  <Layout layoutStyle="LayoutBlank SoftShadowNonHover">
                    <Title>{strings.visitor}</Title>
                    <br className="Margin" />
                    <List listStyle="ListGrid WidthFull" elementStyle="Transparent Tight NoWrap WidthFullImportant">
                      {
                        myVisits.map((visit, index) => {
                          return <OwnerVisitPreview {...visit} key={index} actionCtrl={this.actionCtrl} onClick={this.goToVisit} />;
                        })
                      }
                    </List>
                  </Layout>
                </Element>
            }
            {
              theirVisits && theirVisits.length > 0 &&
                <Element elementStyle={`${myVisits && myVisits.length > 0 ? 'Half' : 'WidthFullImportant'} Transparent NoWrap Top Box`}>
                  <Layout layoutStyle="LayoutBlank SoftShadowNonHover">
                    <Title>{strings.guide}</Title>
                    <br className="Margin" />
                    <List listStyle="ListGrid WidthFull" elementStyle="Transparent Tight NoWrap WidthFullImportant">
                      {
                        theirVisits.map((visit, index) => {
                          return <GuideVisitPreview {...visit} key={index} actionCtrl={this.actionCtrl} onClick={this.goToVisit} />;
                        })
                      }
                    </List>
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
