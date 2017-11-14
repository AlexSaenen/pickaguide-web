import React from 'react';

import MenuLogo from 'menu/MenuLogo.jsx';
import MenuLink from 'menu/MenuLink.jsx';
import { SearchBar } from 'form/SearchBar.jsx';
import { strings } from './MainMenu_lang.js';

import 'scss/main/menu/main.scss';
import 'scss/main/menu/entry.scss';


const MainMenu = () => {
  return (
    <div className="MenuElement MainMenu">
      <div className="MainMenuContentWrapper">
        <MenuLogo />
        <MenuLink href="/" title={strings.home} />
        <MenuLink href="/about" title={strings.about} />
        <MenuLink href="/contact-us" title={strings.contact} />
        <MenuLink href="/view-all-adverts" title={strings.adverts} />
      </div>

      <div className="MainMenuContentWrapper">
        <SearchBar />
      </div>
    </div>
  );
};

export default MainMenu;
