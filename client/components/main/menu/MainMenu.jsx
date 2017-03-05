import React from 'react';

import MenuLogo from 'menu/MenuLogo.jsx';
import MenuLink from 'menu/MenuLink.jsx';
import { SearchBar } from 'form/SearchBar.jsx';

import 'scss/components/menu/_mainMenu.scss';


const MainMenu = () => {
  return (
    <div className="MenuElement MainMenu">
      <div className="MainMenuContentWrapper">
        <MenuLogo />
        <MenuLink href="/" title="Home" />
        <MenuLink href="/about" title="About" />
        <MenuLink href="/contact-us" title="Contact" />
      </div>

      <div className="MainMenuContentWrapper">
        <SearchBar />
      </div>
    </div>
  );
};

export default MainMenu;
