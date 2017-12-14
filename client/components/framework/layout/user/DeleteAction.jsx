import React from 'react';

import 'scss/framework/layout/user.scss';


const DeleteAction = (props) => {
  return (
    <div className={`DeleteAction ${props.className}`} onClick={props.onClick}>
      <svg width="100%" height="100%" viewBox="0 0 400 400">
        <polyline points="15,15 385,385" fillOpacity="0" stroke="#F75C4C" strokeWidth="80" />
        <polyline points="385,15 15,385" fillOpacity="0" stroke="#F75C4C" strokeWidth="80" />
      </svg>
    </div>
  );
};

DeleteAction.propTypes = {
  onClick: React.PropTypes.func.isRequired,
  className: React.PropTypes.string,
};

export default DeleteAction;
