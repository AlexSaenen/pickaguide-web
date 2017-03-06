import React from 'react';

import { PropsComponent } from 'base/PropsComponent.jsx';

import 'scss/framework/layout/header.scss';


export class CheckMark extends PropsComponent {

  constructor(props, context) {
    super(props, context);

    this.state = props;
  }

  render() {
    let drawPoints = '5,260 200,395 395,5';
    let drawColor = '#2ECC71';

    if (this.state.active === false) {
      drawPoints = '-20,-20 420,420 -20,420 420,-20';
      drawColor = '#F75C4C';
    }

    return (
      <div className="CheckMark">
        <svg width="100%" height="100%" viewBox="0 0 400 400">
          <polyline points={drawPoints} fillOpacity="0" stroke={drawColor} strokeWidth="20" />
        </svg>
      </div>
    );
  }

}

CheckMark.propTypes = {
  active: React.PropTypes.bool.isRequired,
};
