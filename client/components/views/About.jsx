import React from 'react';

import { strings } from './About_lang.js';
import { Title } from 'layout/elements/Title.jsx';
import { Button } from 'layout/elements/Button.jsx';
import { Layout } from 'layout/containers/Layout.jsx';

const About = () => {
  return (
    <div>
      <Layout layoutStyle="LayoutBlank">
        <Title>{strings.title}</Title>
      </Layout>
      <Layout>
        <hr className="Overlay" />

        <Layout layoutStyle="W30E MW90 SoftShadowNonHover NoPadding OverflowHidden MarginAuto BigVerticalMargin">
          <Layout layoutStyle="LayoutGray">
            <Title>{strings.team}</Title>
          </Layout>
          <Layout layoutStyle="LayoutRegular">
            <p dangerouslySetInnerHTML={{ __html: strings.teamContent }} />
          </Layout>
        </Layout>

        <Layout layoutStyle="W30E MW90 SoftShadowNonHover NoPadding OverflowHidden MarginAuto BigVerticalMargin">
          <Layout layoutStyle="LayoutGray">
            <Title>{strings.project}</Title>
          </Layout>
          <Layout layoutStyle="LayoutRegular">
            <p dangerouslySetInnerHTML={{ __html: strings.projectContent }} />
          </Layout>
        </Layout>

        <Layout layoutStyle="W30E MW90 SoftShadowNonHover NoPadding OverflowHidden MarginAuto BigVerticalMargin">
          <Layout layoutStyle="LayoutGray">
            <Title>{strings.externalLink}</Title>
          </Layout>
          <Layout layoutStyle="LayoutRegular">
            <Button label={strings.linkLanding} onCallback={() => { window.open('http://eip.epitech.eu/2018/pickaguide', '_blank'); }} buttonStyle="Auto Blue Spaced" />
            <Button label={strings.linkEIP} onCallback={() => { window.open('http://www.epitech.eu/epitech-innovative-projects.aspx', '_blank'); }} buttonStyle="Auto Blue Spaced" />
          </Layout>
        </Layout>
      </Layout>
    </div>
  );
};

export default About;
