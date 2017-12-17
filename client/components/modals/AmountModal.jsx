import React from 'react';

import { ModalForm } from 'view/ModalForm.jsx';
import { Title } from 'layout/elements/Title.jsx';
import { NumInput } from 'form/NumInput.jsx';


export class AmountModal extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.ctrl = props.controller;
    this.ctrl.attachSubmit(props.onConfirm);
  }

  render() {
    return (
      <div>
        <ModalForm controller={this.ctrl} layoutStyle="LayoutDark" modalStyle="Medium">
          <Title>How much do you wish to pay ?</Title>
          <hr className="SpacedOverlay" />
          <NumInput label="amount" min={1} max={200} step={0.5} placeholder="Amount" required />
        </ModalForm>
      </div>
    );
  }
}

AmountModal.propTypes = {
  controller: React.PropTypes.object.isRequired,
  onConfirm: React.PropTypes.func.isRequired,
};
