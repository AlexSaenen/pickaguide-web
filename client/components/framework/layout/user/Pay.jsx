import React from 'react';

import { StoreObserver } from 'base/StoreObserver.jsx';
import { List } from 'layout/list/List.jsx';
import { CardPreview } from 'layout/user/CardPreview.jsx';
import { NewCard } from 'layout/user/NewCard.jsx';
import { Loader } from 'layout/elements/Loader.jsx';
import { QueryModal } from 'modals/QueryModal.jsx';
import { ModalController } from 'base/ModalController.jsx';
import PaymentStore from 'stores/user/Payment.js';
import PaymentActions from 'actions/Payment.js';

import 'scss/framework/payment.scss';


export class Pay extends StoreObserver {

  constructor(props, context) {
    super(props, context, PaymentStore);

    this.state = {
      id: null,
      cards: [],
    };

    this.payCtrl = new ModalController();
    this.onPay = props.onPay || function onPay() {};
  }

  componentDidMount() {
    super.componentDidMount();
    if (this.state.id === null) {
      PaymentActions.getInfos.defer();
    }
  }

  onStore(store) {
    const nextState = Object.assign({}, this.state);

    if (store.error) {
      return;
    } else if (store.infos) {
      nextState.cards = store.infos.sources.data;
      nextState.id = store.infos.id;
    }

    this.setState(nextState);
  }

  render() {
    const cards = this.state.cards;

    if (this.state.id === null) {
      return (<Loader />);
    }

    return (
      <div className="Pay">
        <QueryModal
          controller={this.payCtrl}
          query="This card will be used to pay 10 euros"
          onConfirm={
            function confirm() {
              PaymentActions.pay(this.payCtrl.callerId);
              this.onPay();
            }.bind(this)
          }
        />

        <NewCard />
        {
          cards.length > 0 &&
            <List elementStyle="Tight Clickable">
              {
                cards.map((card, index) => {
                  return <CardPreview {...card} key={index} controller={this.payCtrl} />;
                })
              }
            </List>
        }
      </div>
    );
  }
}
