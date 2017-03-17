import React from 'react';

import { StoreObserver } from 'base/StoreObserver.jsx';
import SearchActions from 'actions/Search.js';
import SearchStore from 'stores/Search.js';
import { PanelForm } from 'view/PanelForm.jsx';


export class Search extends StoreObserver {

  constructor(props, context) {
    super(props, context, [SearchStore]);

    // this.state = {
    //   account: AccountStore.getState().account,
    //   profile: ProfileStore.getState().profile,
    // };

    // this.onStoreChange = this.onStoreChange.bind(this);
    // this.onContact = this.onContact.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    // this.messageCallback = () => {};
  }

  //onSearch(store) {
    // const stateCopy = Object.assign({}, this.state);

    // if (store.error) {
    //   this.messageCallback({
    //     title: 'Some error occurred when contacting us',
    //     content: String(store.error),
    //     type: 'Alert',
    //   });
    // } else {
    //   this.messageCallback({
    //     title: 'Successful',
    //     content: `You have successfully contacted us! Your contact id is '${store.contactId}'. One of our staff will answer you soon.`,
    //     type: 'Success',
    //   });
    // }

    // this.setState(stateCopy);
  //}

  //onStoreChange(store) {
  //   const stateCopy = Object.assign({}, this.state);

  //   if (store.account) {
  //     stateCopy.account = store.account;
  //   } else if (store.profile) {
  //     stateCopy.profile = store.profile;
  //   }

  //   this.updateState(stateCopy);
  // }

  // handleSubmit(form, submitName, messageCallback) {
  //   this.messageCallback = messageCallback;
  //   ContactActions.contact(form);
  //}

  render() {
    // const account = this.state.account;
    // const profile = this.state.profile;

    return (
      <div>
        <PanelForm submitLabel="Save">
          <Title>General settings</Title>
        </PanelForm>
      </div>
    );
  }
}
