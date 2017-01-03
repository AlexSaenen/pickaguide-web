import React from 'react';

import MenuLink from './MenuLink.jsx';
import MenuAction from './MenuAction.jsx';
import { ProfilePicture } from './ProfilePicture.jsx';

import 'scss/components/_home.scss';
import 'scss/components/menu/_partialUserMenu.scss';

const PartialUserMenu = () => {
  return (
    <div className={'MenuElement PartialUserMenu'}>
      <div className={'PartialUserMenuContentWrapper'}>
        <MenuLink href={'/signup'} title={'Sign up'} unauth />
        <MenuLink href={'/login'} title={'Sign in'} unauth />
        <ProfilePicture auth />
        <MenuAction href={'/logout'} title={'Logout'} auth />
      </div>
    </div>
  );
};

export default PartialUserMenu;
