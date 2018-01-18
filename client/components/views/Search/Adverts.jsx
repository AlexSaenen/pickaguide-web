import React from 'react';
import { browserHistory } from 'react-router';

import { PropsComponent } from 'base/PropsComponent.jsx';
import { Layout } from 'layout/containers/Layout.jsx';
import { List } from 'layout/list/List.jsx';
import { Element } from 'layout/list/Element.jsx';
import { AdvertPreview } from 'layout/user/AdvertPreview.jsx';
import { strings } from '../Search_lang.js';


export class Adverts extends PropsComponent {

  constructor(props, context) {
    super(props, context);

    this.navigateToAdvert = this.navigateToAdvert.bind(this);
  }

  navigateToAdvert(advertId) {
    browserHistory.push(`/guide/adverts/${advertId}`);
  }

  render() {
    return (
      <Element key={1} elementStyle="W50 Transparent NoWrap Top Box">
        <Element elementStyle="Tight WidthFullImportant NoWrap">
          <Layout layoutStyle="LayoutRegular SoftShadowNonHover">
            <p dangerouslySetInnerHTML={{ __html: strings.advertText }} / >
          </Layout>
        </Element>

        <List elementStyle="Tight Clickable WidthFullImportant Box NoHorizontalWrap" listStyle="WidthFull">
          {
            this.props.adverts.map((advert, index) => {
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
      </Element>
    );
  }
}
