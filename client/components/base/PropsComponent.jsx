import React from 'react';

import { StateComponent } from 'base/StateComponent.jsx';


export class PropsComponent extends StateComponent {

  constructor(props, context) {
    super(props, context);

    this.state.children = props.children;
  }

  componentWillReceiveProps(props) {
    const stateCopy = Object.assign({}, this.state);

    Object.keys(props).forEach((propKey) => {
      stateCopy[propKey] = props[propKey];
    });

    this.updateState(stateCopy);
  }
}

PropsComponent.propTypes = {
  children: React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.array, React.PropTypes.string]),
};
