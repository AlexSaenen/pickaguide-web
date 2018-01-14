import React from 'react';

import { StoreObserver } from 'base/StoreObserver.jsx';
import { Title } from 'layout/elements/Title.jsx';
import { Information } from 'layout/elements/Information.jsx';
import { Loader } from 'layout/elements/Loader.jsx';
import { Layout } from 'layout/containers/Layout.jsx';
import { Element } from 'layout/list/Element.jsx';
import { List } from 'layout/list/List.jsx';
import { VisitToReview } from 'layout/user/VisitToReview.jsx';
import { strings } from './VisitsToReview_lang.js';
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
          <Title>{strings.title}</Title>
          {
            !(myVisits && theirVisits && myVisits.length === 0 && theirVisits.length === 0) &&
              <Information infoStyle="Medium MarginAuto Warning">{strings.error}</Information>
          }
        </Layout>

        {
          myVisits && theirVisits && myVisits.length === 0 && theirVisits.length === 0 &&
            <Layout layoutStyle="LayoutBlank">
              <hr className="Overlay" />
              <Information infoStyle="Info Small MarginAuto LineSpaced">{strings.noVisit}</Information>
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
                    <Title>{strings.guide}</Title>
                    <br className="Margin" />
                    <List listStyle="ListGrid WidthFull" elementStyle="Transparent Tight NoWrap">
                      {
                        myVisits.map((visit, index) => {
                          return <VisitToReview key={index} {...visit} />;
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
                    <Title>{strings.visitor}</Title>
                    <br className="Margin" />
                    <List listStyle="ListGrid WidthFull" elementStyle="Transparent Tight NoWrap">
                      {
                        theirVisits.map((visit, index) => {
                          return <VisitToReview key={index} {...visit} />;
                        })
                      }
                    </List>
                  </Layout>
                </Element>
            }
          </List>
        </Layout>
      </div>
    );
  }
}
