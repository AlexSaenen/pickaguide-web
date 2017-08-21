import React from 'react';

import 'scss/framework/layout/slider.scss';


const Slider = (props) => {
  return (
    <label className="Switch">
      <input type="checkbox" checked={props.checked} onChange={props.onChange} />
      <span className="Slider Round"></span>
    </label>
  );
};

Slider.defaultProps = {
  checked: false,
};

Slider.propTypes = {
  checked: React.PropTypes.bool,
  onChange: React.PropTypes.func.isRequired,
};

module.exports = { Slider };
