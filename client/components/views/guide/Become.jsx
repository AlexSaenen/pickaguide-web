import React from 'react';

import { StateComponent } from 'base/StateComponent.jsx';
import { ModalFormController } from 'base/ModalFormController.jsx';
import { Guide } from 'modals/Guide.jsx';


export class Become extends StateComponent {

  render() {
    return (
      <div>
        <Guide controller={new ModalFormController(true)} />
      </div>
    );
  }
}
