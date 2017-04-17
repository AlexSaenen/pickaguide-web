import React from 'react';

import { StatusDependent } from 'base/StatusDependent.jsx';
import AuthStore from 'stores/user/Auth.js';


export class AuthDependent extends StatusDependent {

  constructor(props, context) {
    const propsCopy = Object.assign({}, props);
    propsCopy.activator = 'auth';
    propsCopy.deactivator = 'unauth';

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

AuthDependent.defaultProps = {
  auth: false,
  unauth: false,
};

AuthDependent.propTypes = {
  auth: React.PropTypes.bool,
  unauth: React.PropTypes.bool,
};
