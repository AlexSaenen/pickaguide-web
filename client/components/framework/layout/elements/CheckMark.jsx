import React from 'react';

import { PropsComponent } from 'base/PropsComponent.jsx';

import 'scss/framework/layout/header.scss';


export class CheckMark extends PropsComponent {

  constructor(props, context) {
    super(props, context);

    this.state = props;
  }

  render() {
    return (
      <div className="CheckMark">
        {
          (this.state.active === false ?
            <svg width="100%" height="100%" viewBox="0 0 400 400">
              <polyline points="15,15 385,385" fillOpacity="0" stroke="#F75C4C" strokeWidth="30" />
              <polyline points="385,15 15,385" fillOpacity="0" stroke="#F75C4C" strokeWidth="30" />
            </svg>
            :
            <svg width="100%" height="100%" viewBox="0 0 400 400">
              <polyline points="15,265 200,385 385,15" fillOpacity="0" stroke="#2ECC71" strokeWidth="30" />
            </svg>
          )
        }
      </div>
    );
  }

}

CheckMark.propTypes = {
  active: React.PropTypes.bool.isRequired,
};
