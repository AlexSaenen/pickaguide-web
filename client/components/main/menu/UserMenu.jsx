import React from 'react';

import MenuLink from 'menu/MenuLink.jsx';
import MenuAction from 'menu/MenuAction.jsx';
import { UserDropdown } from 'menu/UserDropdown.jsx';
import { strings } from './UserMenu_lang.js';

import AuthActions from 'actions/Auth.js';

import 'scss/main/menu/user.scss';


const UserMenu = () => {
  return (
    <div className="MenuElement UserMenu">
      <div className="UserMenuContentWrapper">
        <MenuLink href="/signup" title={strings.signUp} unauth />
        <MenuLink href="/login" title={strings.signIn} unauth />
        <UserDropdown auth />
        <MenuAction callBack={AuthActions.logout} title={strings.logout} auth />
      </div>
    </div>
  );
};

export default UserMenu;
