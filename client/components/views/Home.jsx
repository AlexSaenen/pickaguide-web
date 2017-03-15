import React from 'react';

import { PanelList } from 'view/PanelList.jsx';
// import { List } from 'layout/List.jsx';


const Home = () => {
  return (
    <div>
      <PanelList wrapChildren={false} layoutStyle="LayoutLight">
        <p>Hello</p>
        <p>World</p>
      </PanelList>
    </div>
  );
};

export default Home;
