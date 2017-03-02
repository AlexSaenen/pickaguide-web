import React from 'react';

import { PropsComponent } from 'base/PropsComponent.jsx';

import 'scss/components/base/layout.scss';


export class Text extends PropsComponent {

  constructor(props, context) {
    super(props, context);

    this.state = props;
  }

  render() {
    return (
      <div className="Text">
        {this.state.children}
      </div>
    );
  }

}
