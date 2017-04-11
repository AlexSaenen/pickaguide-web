import React from 'react';

import 'scss/framework/layout/user.scss';


const DeleteAction = (props) => {
  return (
    <div className="DeleteAction" onClick={props.onClick}>
      <svg width="100%" height="100%" viewBox="0 0 400 400">
        <polyline points="90,170 310,170" fillOpacity="0" strokeWidth="60" />
      </svg>
    </div>
  );
};

DeleteAction.propTypes = {
  onClick: React.PropTypes.func.isRequired,
};

export default DeleteAction;
