import React from 'react';

import { StoreObserver } from 'base/StoreObserver.jsx';
import TransactionsActions from 'actions/Transactions.js';
import TransactionsStore from 'stores/user/Transactions.js';
import { Layout } from 'layout/containers/Layout.jsx';
import { Message } from 'layout/elements/Message.jsx';
import { Information } from 'layout/elements/Information.jsx';
import { Loader } from 'layout/elements/Loader.jsx';
import { strings } from './Search_lang.js';

export class Transactions extends StoreObserver {

  constructor(props, context) {
    super(props, context, TransactionsStore);

    this.state = {
      transactions: null,
      error: null,
    };
  }

  componentDidMount() {
    super.componentDidMount();
    if (this.state.transactions === null) {
      TransactionsActions.get.defer();
    }
  }

  onStore(store) {
    if (store.error) {
      this.setState({ transactions: [], error: store.error });
    } else {
      this.setState({ transactions: store.transactions, error: null });
    }
  }

  render() {
    const transactions = this.state.transactions;

    if (this.state.error || transactions === null) {
      return (
        <Layout layoutStyle="LayoutBlank">
          <Loader />
        </Layout>
      );
    }

    if (transactions.length === 0) {
      return (
        <Layout layoutStyle="LayoutBlank">
          <Information infoStyle="Info Small MarginAuto LineSpaced">No transactions yet</Information>
        </Layout>
      );
    }

    return (
      <Layout layoutStyle="LayoutBlank">
        {
          transactions.map((transaction, index) => {
            return (
              <div key={index}>
                <Message
                  title={transaction.description}
                  content={`You were given ${parseFloat(transaction.amount) / 100.0}€ on ${new Date(transaction.created * 1000).toLocaleString()}`}
                  type="Notif"
                  time={false}
                  messageStyle="Medium MarginAuto"
                />
                <br />
              </div>
            );
          })
        }
      </Layout>
    );
  }
}
