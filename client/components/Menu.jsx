import React from 'react';

import MainMenu from './menu/MainMenu.jsx';
import PartialUserMenu from './menu/PartialUserMenu.jsx';

import 'scss/components/_home.scss';

export class Menu extends React.Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div className={'MainMenuWrapper'}>
        <MainMenu />
        <PartialUserMenu />
      </div>
    );
  }
}
