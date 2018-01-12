import React from 'react';
import { Link } from 'react-router';

import { StoreObserver } from 'base/StoreObserver.jsx';
import TransactionsActions from 'actions/Transactions.js';
import TransactionsStore from 'stores/user/Transactions.js';
import PaymentActions from 'actions/Payment.js';
import PaymentStore from 'stores/user/Payment.js';
import AuthStore from 'stores/user/Auth.js';
import { CardPreview } from 'layout/user/CardPreview.jsx';
import { List } from 'layout/list/List.jsx';
import { NewCard } from 'layout/user/NewCard.jsx';
import { Element } from 'layout/list/Element.jsx';
import { Layout } from 'layout/containers/Layout.jsx';
import { Title } from 'layout/elements/Title.jsx';
import { Message } from 'layout/elements/Message.jsx';
import { Information } from 'layout/elements/Information.jsx';
import { Loader } from 'layout/elements/Loader.jsx';
import { strings } from './Transactions.lang.js';
import { ModalController } from 'base/ModalController.jsx';
import { QueryModal } from 'modals/QueryModal.jsx';

export class Transactions extends StoreObserver {

  constructor(props, context) {
    super(props, context, [TransactionsStore, PaymentStore]);

    this.state = {
      transactions: null,
      cards: [],
      error: null,
    };

    this.deleteAdCtrl = new ModalController();
  }

  componentDidMount() {
    super.componentDidMount();
    if (this.state.transactions === null) {
      TransactionsActions.get.defer();
      PaymentActions.getInfos.defer();
    }
  }

  onStore(store) {
    if (store.error) {
      this.setState({ transactions: [], error: store.error });
    } else if (store.infos) {
      this.setState({ cards: store.infos.sources.data, error: null });
    } else {
      this.setState({ transactions: store.transactions.Payments, error: null });
    }
  }

  render() {
    const transactions = this.state.transactions;
    const cards = this.state.cards;

    const wrapHeader = (body) => (
      <div>
        <Layout>
          <Title>Transactions</Title>
        </Layout>
        <Layout>
          <hr className="Overlay" />
          {body}
        </Layout>
      </div>
    );

    if (this.state.error || transactions === null) {
      return wrapHeader(<Loader />);
    }

    const id = AuthStore.getState().credentials.id;
    const balance = transactions.reduce((sum, transaction) => {
      const isPayer = transaction.payerId === id;
      return sum + (isPayer ? -transaction.amountPayer : transaction.amountBeneficiary);
    }, 0);

    const htmlBalance = (
      <p style={{ lineHeight: '3em', fontSize: '4em', color: `${balance >= 0 ? '#2ECC71' : '#F75C4C'}` }}>{balance > 0 ? `+${balance}` : balance}€</p>
    );

    return wrapHeader(
      <div>
        <QueryModal
          controller={this.deleteAdCtrl}
          query="Do you really wish to delete this card ?"
          onConfirm={
            function confirm() {
              PaymentActions.deleteCard(this.deleteAdCtrl.callerId);
            }.bind(this)
          }
        />

        <List wrapChildren={false} listStyle="ListGrid">
          <Element elementStyle="W30 MinW24E Transparent NoWrap Box">
            <Message
              title="Balance"
              content={htmlBalance}
              type="NeutralLight"
              time={false}
              messageStyle="Auto MarginAuto"
            />
            <br />
            <hr />
            {
              cards.map((card, index) => {
                return <CardPreview {...card} key={index} deleter={this.deleteAdCtrl} />;
              })
            }
            <NewCard />
          </Element>
          <Element elementStyle={`${transactions.length > 0 ? 'W50' : 'AutoWidthContent'} NoWrap Box Top Transparent`}>
            <Layout layoutStyle="LayoutBlank NoWrap NoHorizontalWrap">
              {transactions.length === 0 &&
                <Information infoStyle="Info Small MarginAuto LineSpaced">No transactions yet</Information>
              }
              {
                transactions.map((transaction, index) => {
                  const isPayer = transaction.payerId === id;
                  const content = isPayer ?
                    <p>You gave <span style={{ color: '#F75C4C', fontWeight: 'bold' }}>-{transaction.amountPayer}€</span> to your <Link to={`/profiles/${transaction.beneficiaryId}`}>guide</Link> on {new Date(transaction.date).toLocaleString()}</p>
                    : <p>You received <span style={{ color: '#2ECC71', fontWeight: 'bold' }}>+{transaction.amountBeneficiary}€</span> from your <Link to={`/profiles/${transaction.payerId}`}>visitor</Link> on {new Date(transaction.date).toLocaleString()}</p>

                  return (
                    <div key={index}>
                      <Message
                        title={transaction.description}
                        content={content}
                        type={isPayer ? 'InfoLight' : 'SuccessLight'}
                        time={false}
                        messageStyle="Auto MarginAuto"
                      />
                      <br />
                    </div>
                  );
                })
              }
            </Layout>
          </Element>
        </List>
      </div>
    );
  }
}
