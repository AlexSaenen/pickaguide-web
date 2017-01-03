import React from 'react';
import { Link } from 'react-router';

import MenuEntry from './MenuEntry.jsx';

const MenuAction = (props) => {
  return (
    <MenuEntry {...props}>
      <Link to={props.href}>
        <p>{props.title}</p>
      </Link>
    </MenuEntry>
  );
};

MenuAction.propTypes = {
  href: React.PropTypes.string,
  title: React.PropTypes.string,
};

export default MenuAction;
