import React from 'react';

import 'scss/components/menu/_logo.scss';

const MenuLogo = () => {
    return (
      <div className={'Logo'}>
        <img src="/assets/images/logo.png" alt="PickaGuide Logo" />
      </div>
    );
};

MenuLogo.propTypes = {
};

export default MenuLogo;
