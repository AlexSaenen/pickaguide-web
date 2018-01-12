import React from 'react';

import { Form } from 'layout/form/Form.jsx';
import { TextInput } from 'layout/form/TextInput.jsx';
import { NumInput } from 'layout/form/NumInput.jsx';
import { Title } from 'layout/elements/Title.jsx';
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
          <Title smaller white>New Card</Title>
          <br />
          <NumInput displayLabel="Expiration Month" placeholder="1" label="expirationMonth" min={1} max={12} step={1} required />
          <NumInput displayLabel="Expiration Year" placeholder="2018" label="expirationYear" min={2012} max={2050} step={1} required />
          <TextInput displayLabel={false} label="number" required />
          <NumInput displayLabel={false} placeholder="CVC" label="cvc" required />
        </Form>
      </div>
    );
  }
}

NewCard.propTypes = {
};
