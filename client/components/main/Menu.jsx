import React from 'react';

import MainMenu from 'menu/MainMenu.jsx';
import UserMenu from 'menu/UserMenu.jsx';

import 'scss/main/menu/main.scss';


export class Menu extends React.Component {

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div className="MainMenuWrapper">
        <MainMenu />
        <UserMenu />
      </div>
    );
  }
}
