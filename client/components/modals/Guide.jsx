import React from 'react';

import { StoreObserver } from 'base/StoreObserver.jsx';
import { FormGuideModal } from 'modals/FormGuideModal.jsx';
import ProfileActions from 'actions/Profile.js';
import ProfileStore from 'stores/Profile.js';


export class Guide extends StoreObserver {

  constructor(props, context) {
    super(props, context, ProfileStore);

    this.onStoreChange = this.onStoreChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.messageCallback = () => {};
  }

  onStoreChange(store) {
    const stateCopy = Object.assign({}, this.state);

    if (store.error) {
      this.messageCallback({
        title: 'Some error occurred when you want to become guide',
        content: String(store.error),
        type: 'Alert',
      });
    } else {
      this.messageCallback({
        title: 'Successful',
        content: 'You are now guide !',
        type: 'Success',
      });
    }

    this.setState(stateCopy);
  }

  handleSubmit(form, submitName, messageCallback) {
    this.messageCallback = messageCallback;
    ProfileActions.update(form);
  }

  render() {
    return (
      <FormGuideModal
        {...this.props}
        layoutStyle="LayoutDark Tight"
        title="Become Guide"
        onSubmit={this.handleSubmit}
      />
    );
  }
}
