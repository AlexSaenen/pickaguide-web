import React from 'react';

import MenuLogo from './MenuLogo.jsx';
import { MenuEntry } from './MenuEntry.jsx';
import { SearchBar } from '../formFramework/SearchBar.jsx';

import 'scss/components/_home.scss';
import 'scss/components/menu/_mainMenu.scss';

const MainMenu = () => {
  return (
    <div className={'MenuElement MainMenu'}>
      <div className={'MainMenuContentWrapper'}>
        <MenuLogo />
        <MenuEntry href={'#'} title={'Home'} />
        <MenuEntry href={'#'} title={'About'} />
        <MenuEntry href={'/contactus'} title={'Contact'} />
        <MenuEntry href={'/settings'} title={'Settings'} />
      </div>
      <div className={'MainMenuContentWrapper'}>
        <SearchBar />
      </div>
    </div>
  );
};

export default MainMenu;
