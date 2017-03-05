import React from 'react';

import { PropsComponent } from 'base/PropsComponent.jsx';

import 'scss/framework/layout.scss';


export class SubTitle extends PropsComponent {

  constructor(props, context) {
    super(props, context);

    this.state = props;
  }

  render() {
    return (
      <div className="SubTitle">
        {this.state.children}
      </div>
    );
  }

}
