import React from 'react';

import MenuLogo from './MenuLogo.jsx';
import { MenuEntry } from './MenuEntry.jsx';

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
        <div className="recherche">
          <form action="/search" id="searchthis" method="get">
          <input id="search" name="q" type="text" placeholder="Search" />
          <input id="search-btn" type="submit" value="Rechercher" />
          </form>
        </div>
        </div>

      </div>
    );
};

MainMenu.propTypes = {
};

export default MainMenu;
