import React from 'react';

import { StateComponent } from 'base/StateComponent.jsx';
import { ModalFormController } from 'base/ModalFormController.jsx';
import { Guide } from 'modals/Guide.jsx';


export class Become extends StateComponent {

  constructor(props, context) {
    super(props, context);

    this.guideCtrl = new ModalFormController(true);
  }

  render() {
    return (
      <div>
        <Guide controller={this.guideCtrl} />
      </div>
    );
  }
}
