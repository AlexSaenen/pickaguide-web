import React from 'react';

import { StoreObserverForChildren } from 'base/StoreObserverForChildren.jsx';


export class StatusDependent extends StoreObserverForChildren {

  constructor(props, context, store) {
    super(props, context, store);
    this.active = props[props.activator];
    this.unactive = props[props.deactivator] && !this.active;
    this.className = props.className;

    this.state.isVisible = false;
  }

  render() {
    return (
      <div className={`${this.className}${this.state.isVisible ? '' : ' Hidden'}`}>
        {this.props.children}
      </div>
    );
  }
}

StatusDependent.defaultProps = {
  active: false,
  unactive: false,
};

StatusDependent.propTypes = {
  className: React.PropTypes.string,
  active: React.PropTypes.bool,
  unactive: React.PropTypes.bool,
};
