import React from 'react';

import { StoreObserver } from 'base/StoreObserver.jsx';
import { Guide } from 'modals/Guide.jsx';
import ProfileStore from 'stores/Profile.js';
import ProfileActions from 'actions/Profile.js';


export class Become extends StoreObserver {

  constructor(props, context) {
    super(props, context, ProfileStore);

    this.state = {
      profile: ProfileStore.getState().profile,
      modalStateGuide: true,
    };

    this.toggleModalGuide = this.toggleModalGuide.bind(this);
  }

  toggleModalGuide() {
    const stateCopy = Object.assign({}, this.state);
    stateCopy.modalStateGuide = !this.state.modalStateGuide;
    this.updateState(stateCopy);
  }

  render() {
    const profile = this.state.profile || {};
    return (
      <div>
          <Guide
            active={this.state.modalStateGuide}
            onClose={this.toggleModalGuide}
          />
      </div>
    );
  }
}
