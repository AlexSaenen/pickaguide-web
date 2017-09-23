import React from 'react';

import { Form } from 'layout/form/Form.jsx';
import { TextInput } from 'layout/form/TextInput.jsx';
import { NumInput } from 'layout/form/NumInput.jsx';
import { SubTitle } from 'layout/elements/SubTitle.jsx';
import { FormController } from 'base/FormController.jsx';
import PaymentActions from 'actions/Payment.js';

import 'scss/framework/payment.scss';


export class NewCard extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.ctrl = new FormController();
    this.ctrl.attachSubmit(this.onSubmit.bind(this));
  }

  onSubmit(form) {
    PaymentActions.newCard(form);
  }

  render() {
    return (
      <div className="NewCard">
        <Form layoutStyle="" onSubmit={this.ctrl.submit} submitLabel="Create Card">
          <SubTitle>Expiration Date (Month then Year)</SubTitle>
          <NumInput placeholder="1" label="exp_month" min={1} max={12} step={1} required />
          <NumInput placeholder="2018" label="exp_year" min={2012} max={2050} step={1} required />
          <TextInput label="number" required />
          <br />
          <TextInput placeholder="CVC" label="cvc" required />
        </Form>
      </div>
    );
  }
}

NewCard.propTypes = {
};
