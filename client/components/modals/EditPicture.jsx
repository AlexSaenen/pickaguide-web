import React from 'react';

import { StoreObserver } from 'base/StoreObserver.jsx';
import { LinkModal } from 'modals/LinkModal.jsx';
import ProfileActions from 'actions/Profile.js';
import ProfileStore from 'stores/Profile.js';


export class EditPicture extends StoreObserver {

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
        title: 'Some error occurred when updating your profile picture',
        content: String(store.error),
        type: 'Alert',
      });
    } else {
      this.messageCallback({
        title: 'Successful',
        content: 'Your picture has been updated',
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
    console.log('EditPicture.render()');
    return (
      <LinkModal
        {...this.props}
        layoutStyle="LayoutDark Tight"
        title="Edit Profile Picture"
        inputHolder="New URL"
        inputLabel="photoUrl"
        onSubmit={this.handleSubmit}
      />
    );
  }
}
