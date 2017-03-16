import React from 'react';

import { AuthDependent } from 'base/AuthDependent.jsx';

import 'scss/main/menu/main.scss';


const MenuEntry = (props) => {
  const copyProps = Object.assign({}, props);
  delete copyProps.children;

  return (
    <AuthDependent className="MenuEntry" {...copyProps}>
      {props.children}
    </AuthDependent>
  );
};

MenuEntry.propTypes = {
  children: React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.array]),
};

export default MenuEntry;
