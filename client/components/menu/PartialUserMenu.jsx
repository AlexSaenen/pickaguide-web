import React from 'react';

import MenuLink from 'menu/MenuLink.jsx';
import MenuAction from 'menu/MenuAction.jsx';
import { ProfilePicture } from 'menu/ProfilePicture.jsx';
import AuthActions from 'actions/Auth.js';
import { Link } from 'react-router';

import 'scss/components/menu/_partialUserMenu.scss';


const PartialUserMenu = () => {
  return (
    <div className="MenuElement PartialUserMenu">
      <div className="PartialUserMenuContentWrapper">
        <MenuLink href="/signup" title="Sign up" unauth />
        <MenuLink href="/login" title="Sign in" unauth />

        <div className="dropdown">
          <ProfilePicture auth />

          <div className="dropdown-content">
            <Link to="/settings"><p>Settings</p></Link>
            <Link to="/settingsAccount"><p>Account</p></Link>
            <Link to="/settingsProfile"><p>Profile</p></Link>
          </div>
        </div>

        <MenuAction callBack={AuthActions.logout} title="Logout" auth />
      </div>
    </div>
  );
};

export default PartialUserMenu;
