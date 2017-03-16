import React from 'react';

import { PropsComponent } from 'base/PropsComponent.jsx';

import 'scss/framework/list.scss';


export class Element extends PropsComponent {

  render() {
    return (
      <div className="Element">
        {this.props.children}
      </div>
    );
  }
}
