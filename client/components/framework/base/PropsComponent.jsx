import React from 'react';

import { StateComponent } from 'base/StateComponent.jsx';


export class PropsComponent extends StateComponent {

  constructor(props, context) {
    super(props, context);

    this.state.children = props.children;
  }

  componentWillReceiveProps(props) {
    const newState = Object.assign({}, this.state);

    Object.keys(props).forEach((propKey) => {
      if (newState[propKey] !== undefined) {
        newState[propKey] = props[propKey];
      }
    });

    this.updateState(newState);
  }
}

PropsComponent.propTypes = {
  children: React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.array, React.PropTypes.string]),
};
