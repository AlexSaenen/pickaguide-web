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
          <MenuEntry href={'#'} title={'Contact'} />
        </div>
      </div>
    );
};

MainMenu.propTypes = {
};

export default MainMenu;
