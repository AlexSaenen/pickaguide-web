import React from 'react';

import { ModalList } from 'view/ModalList.jsx';
import { PanelList } from 'view/PanelList.jsx';
import { Element } from 'layout/Element.jsx';
import { Lister } from 'layout/Lister.jsx';


const Home = () => {
  return (
    <div>
      <Lister wrapChildren listStyle="ListGrid">
        <p>Hello</p>
        <p>World</p>
      </Lister>

      <PanelList wrapChildren={false}>
        <Element>Hello</Element>
        <Element>World</Element>
      </PanelList>

      <PanelList wrapChildren listStyle="ListGrid">
        <p>Hello</p>
        <p>World</p>
      </PanelList>

      <ModalList active>
        <p>Hello</p>
        <p>World of my zbooba die doo</p>
      </ModalList>

      <ModalList active listStyle="ListGrid" modalStyle="Large">
        <p>Hello</p>
        <p>World of my zbooba die doo</p>
        <p>Hello</p>
        <p>World of my zbooba die doo</p>
        <p>Hello</p>
        <p>World of my zbooba die doo</p>
        <p>Hello</p>
        <p>World of my zbooba die doo</p>
      </ModalList>
    </div>
  );
};

export default Home;
