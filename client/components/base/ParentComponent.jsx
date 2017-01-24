import React from 'react';
import { StateComponent } from './StateComponent.jsx';

export class ParentComponent extends StateComponent {
  constructor(props, context) {
    super(props, context);

    this.state.children = props.children;
  }

  componentWillReceiveProps(props) {
    const stateCopy = Object.assign({}, this.state);
    stateCopy.children = props.children;
    this._alterState(stateCopy);
  }
}

ParentComponent.propTypes = {
  children: React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.array]),
};
