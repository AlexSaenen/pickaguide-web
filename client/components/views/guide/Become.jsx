import React from 'react';

import { StoreObserver } from 'base/StoreObserver.jsx';
import { StateComponent } from 'base/StateComponent.jsx';
import { Guide } from 'modals/Guide.jsx';
import ProfileStore from 'stores/Profile.js';
import ProfileActions from 'actions/Profile.js';


export class Become extends StateComponent {

  constructor(props, context) {
    super(props, context);

    this.state = {
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
