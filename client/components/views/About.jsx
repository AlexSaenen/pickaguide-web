import React from 'react';
import { browserHistory } from 'react-router';

import { strings } from './About_lang.js';
import { Title } from 'layout/elements/Title.jsx';
import { Button } from 'layout/elements/Button.jsx';
import { Panel } from 'layout/containers/Panel.jsx';
import { Layout } from 'layout/containers/Layout.jsx';

const About = () => {
  return (
    <div>
      <Layout layoutStyle="LayoutDark">
        <hr className="Overlay" />
        <Title>{strings.title}</Title>
      </Layout>
      <Panel panelStyle="Medium">
        <Layout layoutStyle="LayoutGray">
          <Title>{strings.team}</Title>
        </Layout>
        <Layout layoutStyle="LayoutLight">
          <hr className="Overlay" />
          <p dangerouslySetInnerHTML={{ __html: strings.teamContent }} />
        </Layout>
      </Panel>
      <Panel panelStyle="Medium">
        <Layout layoutStyle="LayoutGray">
          <Title>{strings.project}</Title>
        </Layout>
        <Layout layoutStyle="LayoutLight">
          <hr className="Overlay" />
          <p dangerouslySetInnerHTML={{ __html: strings.projectContent }} />
        </Layout>
      </Panel>
      <Panel panelStyle="Medium">
        <Layout layoutStyle="LayoutGray">
          <Title>{strings.externalLink}</Title>
        </Layout>
        <Layout layoutStyle="LayoutLight">
          <hr className="Overlay" />
          <Button label={strings.linkLanding} onCallback={() => { window.open('http://eip.epitech.eu/2018/pickaguide', '_blank'); }} buttonStyle="Auto Blue Spaced" />
          <Button label={strings.linkEIP} onCallback={() => { window.open('http://www.epitech.eu/epitech-innovative-projects.aspx', '_blank'); }} buttonStyle="Auto Blue Spaced" />
        </Layout>
      </Panel>
    </div>
  );
};

export default About;
