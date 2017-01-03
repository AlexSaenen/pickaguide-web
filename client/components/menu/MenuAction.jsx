import React from 'react';

import MenuEntry from './MenuEntry.jsx';

const MenuAction = (props) => {
  return (
    <MenuEntry {...props}>
      <a onClick={props.callBack}>
        <p>{props.title}</p>
      </a>
    </MenuEntry>
  );
};

MenuAction.propTypes = {
  callBack: React.PropTypes.func,
  title: React.PropTypes.string,
};

export default MenuAction;
