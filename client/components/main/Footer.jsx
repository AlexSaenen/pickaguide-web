import React from 'react';

import 'scss/main/layout.scss';
import { Title } from 'layout/elements/Title.jsx';
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
          <Layout layoutStyle="LayoutBlack PaddingOne">
            <Title>{strings.contact}</Title>
            <p>06.70.62.85.88 - <a href="mailto:contact@pickaguide.com">contact@pickaguide.com</a></p>
          </Layout>
          <Layout layoutStyle="LayoutBlack PaddingOne">
            <Title>{strings.followUs}</Title>
            <ul className="FollowUs">
              <li><a href="https://www.facebook.com/pickaguide/" target="_blank"><img src="/assets/images/fb.png" alt="fb" height="30" width="30" /></a></li>
              <li><a href="https://twitter.com/pickaguide" target="_blank"><img src="/assets/images/twitter.svg" alt="twitter" height="30" width="30" /></a></li>
            </ul>
          </Layout>
        </Layout>
      </div>
    );
  }
}
