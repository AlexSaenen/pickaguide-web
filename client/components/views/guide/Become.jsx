import React from 'react';

import { StateComponent } from 'base/StateComponent.jsx';
import { Guide } from 'modals/Guide.jsx';


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
