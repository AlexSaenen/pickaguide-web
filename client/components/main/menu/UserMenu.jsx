import React from 'react';

import MenuLink from 'menu/MenuLink.jsx';
import MenuAction from 'menu/MenuAction.jsx';
import { ProfilePicture } from 'menu/ProfilePicture.jsx';
import AuthActions from 'actions/Auth.js';

import 'scss/main/menu/user.scss';


const UserMenu = () => {
  return (
    <div className="MenuElement UserMenu">
      <div className="UserMenuContentWrapper">
        <MenuLink href="/signup" title="Sign up" unauth />
        <MenuLink href="/login" title="Sign in" unauth />
        <ProfilePicture auth />
        <MenuAction callBack={AuthActions.logout} title="Logout" auth />
      </div>
    </div>
  );
};

export default UserMenu;
