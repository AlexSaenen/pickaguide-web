import React from 'react';

import { PropsComponent } from 'base/PropsComponent.jsx';

import 'scss/framework/layout.scss';


export class Title extends PropsComponent {

  constructor(props, context) {
    super(props, context);

    this.state = props;
  }

  render() {
    return (
      <div className="Title">
        {this.state.children}
      </div>
    );
  }

}
