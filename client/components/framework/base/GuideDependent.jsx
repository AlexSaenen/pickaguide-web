import React from 'react';

import { StatusDependent } from 'base/StatusDependent.jsx';
import AuthStore from 'stores/Auth.js';


export class GuideDependent extends StatusDependent {

  constructor(props, context) {
    const propsCopy = Object.assign({}, props);
    propsCopy.activator = 'guide';
    propsCopy.deactivator = 'visitor';

    super(propsCopy, context, AuthStore);

    this.state.isVisible = this._isVisible(AuthStore.getState().credentials);
    this.onStoreChange = this.onStoreChange.bind(this);
  }

  onStoreChange(store) {
    const stateCopy = Object.assign({}, this.state);
    stateCopy.isVisible = this._isVisible(store.credentials);
    this.updateState(stateCopy);
  }

  _isVisible(credentials) {
    return (credentials === null ? (this.unactive || !this.active) : (this.active || !this.unactive));
  }
}

GuideDependent.defaultProps = {
  guide: false,
  visitor: false,
};

GuideDependent.propTypes = {
  guide: React.PropTypes.bool,
  visitor: React.PropTypes.bool,
};
