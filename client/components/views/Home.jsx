import React from 'react';

// import { ModalList } from 'view/ModalList.jsx';
import { PanelList } from 'view/PanelList.jsx';
import { Element } from 'layout/list/Element.jsx';
import { Title } from 'layout/elements/Title.jsx';
import { Layout } from 'layout/containers/Layout.jsx';
import { Lister } from 'layout/containers/Lister.jsx';

// Lister est une liste seule a afficher au lieu d'un Panel (les elements sont libres)
// PanelList est une liste dans un Panel
// ModalList est une liste dans une Modal
// Bien sur vous pouvez vous meme creer un Component Modal et manuellement y inserer une Liste,
// ModalList et PanelList sont juste des shortcuts

// listStyle => ListGrid (elements un a cote des autres) ou ListStack (elements de haut en bas, default)
// wrapChildren => si true (default) la Liste va encapsuler chaque node HTML par Element, false signifie que
// le user le fait manuellement, chaque fils HTML a au final besoin d'etre encapsule par Element

const Home = () => {
  return (
    <div>
      <Layout layoutStyle="LayoutDark">
        <hr className="Overlay" />
        <Title>Salut Home Page</Title>
      </Layout>

      <Lister wrapChildren listStyle="ListGrid">
        <p>Hello</p>
        <p>World</p>
      </Lister>

      <Lister listStyle="ListStack">
        <p>Hello</p>
        <p>World</p>
      </Lister>

      <PanelList wrapChildren={false} panelStyle="Small">
        <Element>Hello</Element>
        <Element>World</Element>
      </PanelList>

      <PanelList wrapChildren listStyle="ListGrid">
        <p>Hello</p>
        <p>World</p>
      </PanelList>
    </div>
  );
};
export default Home;
