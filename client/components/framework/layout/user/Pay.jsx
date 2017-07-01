import React from 'react';

import { StoreObserver } from 'base/StoreObserver.jsx';
import PaymentStore from 'stores/user/Payment.js';
import PaymentActions from 'actions/Payment.js';

import 'scss/framework/payment.scss';


export class Pay extends StoreObserver {

  constructor(props, context) {
    super(props, context, PaymentStore);

    this.state = {
      cards: [],
    };
  }

  componentDidMount() {
    super.componentDidMount();
    if (this.state.advert === undefined) {
      PaymentActions.getInfos();
    }
  }

  onStore(store) {
    const nextState = Object.assign({}, this.state);

    if (store.error) {
      return;
    } else if (store.cards) {
      nextState.cards = store.cards;
    }

    this.setState(nextState);
  }

  render() {
    return (
      <div className="Pay">
        hello
      </div>
    );
  }
}

Pay.propTypes = {
};
