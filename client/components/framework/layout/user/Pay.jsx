import React from 'react';

import { StoreObserver } from 'base/StoreObserver.jsx';
import { CardPreview } from 'layout/user/CardPreview.jsx';
import { NewCard } from 'layout/user/NewCard.jsx';
import { Loader } from 'layout/elements/Loader.jsx';
import { QueryModal } from 'modals/QueryModal.jsx';
import { AmountModal } from 'modals/AmountModal.jsx';
import { ModalController } from 'base/ModalController.jsx';
import { ModalFormController } from 'base/ModalFormController.jsx';
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

    this.visitId = props.visitId;
    this.payCtrl = new ModalController();
    this.amountCtrl = new ModalFormController();
    this.deleteAdCtrl = new ModalController();
    this.onPay = props.onPay || function onPay() {};
  }

  componentDidMount() {
    super.componentDidMount();
    if (this.state.id === null) {
      PaymentActions.getInfos.defer();
    }
  }

  componentWillReceiveProps(nextProps) {
    this.visitId = nextProps.visitId;
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
        <AmountModal
          controller={this.amountCtrl}
          onConfirm={
            function confirm(form) {
              this.payCtrl.amount = form.amount;
              this.payCtrl.callerId = this.amountCtrl.callerId;
              this.payCtrl.toggle(true);
            }.bind(this)
          }
        />

        <QueryModal
          controller={this.deleteAdCtrl}
          query="Do you really wish to delete this card ?"
          onConfirm={
            function confirm() {
              PaymentActions.deleteCard(this.deleteAdCtrl.callerId);
            }.bind(this)
          }
        />

        <QueryModal
          controller={this.payCtrl}
          query="This card will be used to pay"
          onConfirm={
            function confirm() {
              PaymentActions.pay({
                idVisit: this.visitId,
                idCard: this.payCtrl.callerId,
                amount: this.payCtrl.amount,
              });
              this.onPay();
            }.bind(this)
          }
        />

        {
          cards.map((card, index) => {
            return <div className="Clickable"><CardPreview {...card} key={index} controller={this.amountCtrl} deleter={this.deleteAdCtrl} /></div>;
          })
        }
        <NewCard />
      </div>
    );
  }
}
