import React from 'react';

import { StoreObserverForChildren } from 'base/StoreObserverForChildren.jsx';
import AuthStore from 'stores/Auth.js';


export class AuthDependent extends StoreObserverForChildren {

  constructor(props, context) {
    super(props, context, AuthStore);
    this.auth = props.auth;
    this.unauth = props.unauth && !props.auth;
    this.className = props.className;

    this.state.isVisible = this._isVisible(AuthStore.getState().token);
    this.onStoreChange = this.onStoreChange.bind(this);
  }

  onStoreChange(store) {
    const stateCopy = Object.assign({}, this.state);
    stateCopy.isVisible = this._isVisible(store.token);
    this.updateState(stateCopy);
  }

  _isVisible(token) {
    return (token === null ? (this.unauth || !this.auth) : (this.auth || !this.unauth));
  }

  render() {
    return (
      <div className={`${this.className}${this.state.isVisible ? '' : ' Hidden'}`}>
        {this.state.children}
      </div>
    );
  }
}

AuthDependent.defaultProps = {
  auth: false,
  unauth: false,
};

AuthDependent.propTypes = {
  className: React.PropTypes.string,
  auth: React.PropTypes.bool,
  unauth: React.PropTypes.bool,
};
