import React from 'react';

import { StatusDependent } from 'base/StatusDependent.jsx';
import ProfileStore from 'stores/user/Profile.js';


export class GuideDependent extends StatusDependent {

  constructor(props, context) {
    const propsCopy = Object.assign({}, props);
    propsCopy.activator = 'guide';
    propsCopy.deactivator = 'visitor';

    super(propsCopy, context, ProfileStore);

    this.state.isVisible = this._isVisible(ProfileStore.getState().isGuide);
    this.onStoreChange = this.onStoreChange.bind(this);
  }

  onStoreChange(store) {
    const stateCopy = Object.assign({}, this.state);
    stateCopy.isVisible = this._isVisible(store.isGuide);
    this.updateState(stateCopy);
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
