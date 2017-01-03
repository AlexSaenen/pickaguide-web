import React from 'react';

import Menu from './Menu.jsx';
import Footer from './Footer.jsx';

import 'scss/components/_home.scss';

const MainLayout = (props) => {
  return (
    <div>
      <Menu />
      {props.children}
      <Footer />
    </div>
  );
};

MainLayout.propTypes = {
  children: React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.array]),
};

export default MainLayout;
