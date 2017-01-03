import React from 'react';

import MenuLogo from './MenuLogo.jsx';
import MenuLink from './MenuLink.jsx';
import { SearchBar } from '../formFramework/SearchBar.jsx';

import 'scss/components/_home.scss';
import 'scss/components/menu/_mainMenu.scss';

const MainMenu = () => {
  return (
    <div className={'MenuElement MainMenu'}>
      <div className={'MainMenuContentWrapper'}>
        <MenuLogo />
        <MenuLink href={'#'} title={'Home'} />
        <MenuLink href={'#'} title={'About'} />
        <MenuLink href={'/contactus'} title={'Contact'} />
        <MenuLink href={'/settings'} title={'Settings'} auth />
      </div>
      <div className={'MainMenuContentWrapper'}>
        <SearchBar />
      </div>
    </div>
  );
};

export default MainMenu;
