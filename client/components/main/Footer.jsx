import React from 'react';

import 'scss/main/layout.scss';
import { Title } from 'layout/elements/Title.jsx';
import { PanelList } from 'view/PanelList.jsx';
import { Element } from 'layout/list/Element.jsx';
import { Layout } from 'layout/containers/Layout.jsx';
import { strings } from './Footer_lang.js';

export class Footer extends React.Component {

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div className="Footer">
        <Layout layoutStyle="LayoutFooter NoWrap">
          <Layout layoutStyle="LayoutFooterLeft">
            <Title>{strings.contact}</Title>
            <p>0670628588</p>
            <p><a href="mailto:contact@pickaguide.com">contact@pickaguide.com</a></p>
          </Layout>
          <Layout layoutStyle="LayoutFooterCenter">
            <Title>{strings.followUs}</Title>
            <ul className="FollowUs">
              <li><a href="https://www.facebook.com" target="_blank"><img src="/assets/images/fb.png" alt="fb" height="30" width="30"/></a></li>
              <li><a href="https://www.twitter.com" target="_blank"><img src="/assets/images/twitter.png" alt="twitter" height="30" width="30"/></a></li>
              <li><a href="https://www.instagram.com" target="_blank"><img src="/assets/images/insta.png" alt="insta" height="30" width="30"/></a></li>
            </ul>
          </Layout>
          <Layout layoutStyle="LayoutFooterRight">
            <Title>{strings.information}</Title>
            <ul className="Info">
              <li><a href="https://pickaguide.fr/about" target="_blank">{strings.about}</a></li>
              <li><a href="https://www.google.com" target="_blank">{strings.legal}</a></li>
            </ul>
          </Layout>
        </Layout>
      </div>
    );
  }
}
