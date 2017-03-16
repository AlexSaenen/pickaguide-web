import React from 'react';

import { PropsComponent } from 'base/PropsComponent.jsx';

import 'scss/framework/layout/header.scss';


export class CheckMark extends PropsComponent {

  constructor(props, context) {
    super(props, context);

    this.state = props;
  }

  render() {
    let drawPoints = '15,265 200,385 385,15';
    let drawColor = '#2ECC71';

    if (this.state.active === false) {
      drawPoints = '-30,-30 430,430 -30,430 430,-30';
      drawColor = '#F75C4C';
    }

    return (
      <div className="CheckMark">
        <svg width="100%" height="100%" viewBox="0 0 400 400">
          <polyline points={drawPoints} fillOpacity="0" stroke={drawColor} strokeWidth="30" />
        </svg>
      </div>
    );
  }

}

CheckMark.propTypes = {
  active: React.PropTypes.bool.isRequired,
};
