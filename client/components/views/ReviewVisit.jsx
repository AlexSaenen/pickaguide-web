import React from 'react';

import { StoreObserver } from 'base/StoreObserver.jsx';


//   PaymentActions.pay(AuthStore.getState().credentials.id);
// this.state.rated === false ?
//   <Form submitLabel="Rate" onSubmit={this.rate}>
//     <NumInput label="Rate" min={1} max={5} step={1} required />
//   </Form>
// :
//   <Pay />

export class ReviewVisit extends StoreObserver {

  constructor(props, context) {
    super(props, context, []);

    this.id = props.params.id;
  }

  // componentDidMount() {
  //   super.componentDidMount();
  // }
  //
  // onStore(store) {
  //   const newState = Object.assign({}, this.state);
  //
  //
  //   this.setState(newState);
  // }

  // onSubmit(form) {
  // }

  render() {

    return (
      <p>Hello</p>
    );
  }
}
