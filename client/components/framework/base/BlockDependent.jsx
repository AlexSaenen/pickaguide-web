import React from 'react';

import { StatusDependent } from 'base/StatusDependent.jsx';
import BlockStore from 'stores/user/Block.js';


export class BlockDependent extends StatusDependent {

  constructor(props, context) {
    const propsCopy = Object.assign({}, props);
    propsCopy.activator = 'block';
    propsCopy.deactivator = 'free';

    super(propsCopy, context, BlockStore);

    this.state.isVisible = this._isVisible(BlockStore.getState().isBlocking);
    this.onStore = this.onStore.bind(this);
  }

  onStore(store) {
    const newState = Object.assign({}, this.state);
    newState.isVisible = this._isVisible(store.isBlocking);
    this.updateState(newState);
  }

  _isVisible(isBlocking) {
    return (isBlocking === false ? (this.unactive || !this.active) : (this.active || !this.unactive));
  }
}

BlockDependent.defaultProps = {
  block: false,
  free: false,
};

BlockDependent.propTypes = {
  block: React.PropTypes.bool,
  free: React.PropTypes.bool,
};
