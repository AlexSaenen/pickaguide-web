import React from 'react';

import { Title } from 'layout/elements/Title.jsx';
import { Information } from 'layout/elements/Information.jsx';
import { Layout } from 'layout/containers/Layout.jsx';
import { PanelLayout } from 'view/PanelLayout.jsx';

const Home = () => {
  return (
    <div>
      <Layout layoutStyle="LayoutDark">
        <hr className="Overlay" />
        <Title>Salut Home Page</Title>
      </Layout>

      <PanelLayout>
        <Information>
          Hello my friends, this is information, I'm just showing off
          this new component I'm designing, do you like it a bit then ?
        </Information>
        <Information infoStyle="Alert">
          Hello my friends, this is information, I'm just showing off
          this new component I'm designing, do you like it a bit then ?
        </Information>
        <Information infoStyle="Success">
          Hello my friends, this is information, I'm just showing off
          this new component I'm designing, do you like it a bit then ?
        </Information>
      </PanelLayout>
    </div>
  );
};
export default Home;
