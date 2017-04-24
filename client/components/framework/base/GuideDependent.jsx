import React from 'react';

import { StatusDependent } from 'base/StatusDependent.jsx';
import UserStore from 'stores/user/User.js';


export class GuideDependent extends StatusDependent {

  constructor(props, context) {
    const propsCopy = Object.assign({}, props);
    propsCopy.activator = 'guide';
    propsCopy.deactivator = 'visitor';

    super(propsCopy, context, UserStore);

    this.state.isVisible = this._isVisible(UserStore.getState().isGuide);
    this.onStore = this.onStore.bind(this);
  }

  onStore(store) {
    const newState = Object.assign({}, this.state);
    newState.isVisible = this._isVisible(store.isGuide);
    this.updateState(newState);
  }

  _isVisible(isGuide) {
    return (isGuide === false ? (this.unactive || !this.active) : (this.active || !this.unactive));
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
