import React from 'react';
import { strings } from './About_lang.js';
import { Title } from 'layout/elements/Title.jsx';
import { Layout } from 'layout/containers/Layout.jsx';
import { PanelLayout } from 'view/PanelLayout.jsx';

const About = () => {
  return (
    <div>
      <Layout layoutStyle="LayoutDark">
        <hr className="Overlay" />
        <Title>{strings.title}</Title>
      </Layout>
      <PanelLayout>
      	<Title>{strings.team}</Title>
        <hr className="SpacedOverlay" />
      	<p>{strings.teamContent}</p>
      </PanelLayout>
      <PanelLayout>
      	<Title>{strings.project}</Title>
        <hr className="SpacedOverlay" />
      	<p>{strings.projectContent}</p>
      </PanelLayout>
      <PanelLayout>
      	<Title>{strings.externalLink}</Title>
        <hr className="SpacedOverlay" />
      	<a href="http://eip.epitech.eu/2018/pickaguide">{strings.linkLanding}</a>
      	<br/>
      	<a href="http://www.epitech.eu/epitech-innovative-projects.aspx">{strings.linkEIP}</a>
      </PanelLayout>
    </div>
  );
};

export default About;
