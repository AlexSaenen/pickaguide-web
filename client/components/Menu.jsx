import React from 'react';

import MainMenu from './menu/MainMenu.jsx';
import PartialUserMenu from './menu/PartialUserMenu.jsx';

import 'scss/components/_home.scss';

const HomeMenu = () => {
  return (
    <div className={'MainMenuWrapper'}>
      <MainMenu />
      <PartialUserMenu />
    </div>
  );
};

export default HomeMenu;
