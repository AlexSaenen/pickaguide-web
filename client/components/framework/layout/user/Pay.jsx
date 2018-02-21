import React from 'react';

import { StoreObserver } from 'base/StoreObserver.jsx';
import { CardPreview } from 'layout/user/CardPreview.jsx';
import { NewCard } from 'layout/user/NewCard.jsx';
import { Message } from 'layout/elements/Message.jsx';
import { Loader } from 'layout/elements/Loader.jsx';
import { QueryModal } from 'modals/QueryModal.jsx';
import { AmountModal } from 'modals/AmountModal.jsx';
import { ModalController } from 'base/ModalController.jsx';
import { ModalFormController } from 'base/ModalFormController.jsx';
import { strings } from './Pay_lang.js';
import PaymentStore from 'stores/user/Payment.js';
import PaymentActions from 'actions/Payment.js';

import 'scss/framework/payment.scss';


const emptyMessage = () => ({
  title: '',
  content: '',
  type: '',
});

export class Pay extends StoreObserver {

  constructor(props, context) {
    super(props, context, PaymentStore);

    this.state = {
      id: null,
      cards: [],
      message: emptyMessage(),
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
      nextState.message = {
        title: 'An error occurred',
        content: store.error,
        type: 'Alert',
      };
    } else if (store.infos) {
      nextState.cards = store.infos.sources.data;
      nextState.id = store.infos.id;
      if (this.paying) {
        nextState.message = {
          title: 'All good!',
          content: 'Your payment got through! You can make more payments if you want',
          type: 'Success',
        };
      }
    }

    this.setState(nextState);
  }

  render() {
    const cards = this.state.cards;
    const { message } = this.state;

    if (this.state.id === null) {
      return (<Loader />);
    }

    return (
      <div className="Pay">
        <br />
        <Message timed={false} {...message} />
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
          query={strings.delete}
          onConfirm={
            function confirm() {
              PaymentActions.deleteCard(this.deleteAdCtrl.callerId);
            }.bind(this)
          }
        />

        <QueryModal
          controller={this.payCtrl}
          query={strings.use}
          onConfirm={
            function confirm() {
              PaymentActions.pay({
                idVisit: this.visitId,
                idCard: this.payCtrl.callerId,
                amount: this.payCtrl.amount,
              });
              this.paying = true;
              this.amountCtrl.toggle(false);
              this.onPay();
            }.bind(this)
          }
        />

        {
          cards.map((card, index) => {
            return <div key={index} className="Clickable"><CardPreview {...card} controller={this.amountCtrl} deleter={this.deleteAdCtrl} /></div>;
          })
        }
        <NewCard />
      </div>
    );
  }
}
