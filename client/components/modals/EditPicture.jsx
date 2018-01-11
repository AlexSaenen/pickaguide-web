import React from 'react';

import { StoreObserver } from 'base/StoreObserver.jsx';
import { FileModal } from 'modals/FileModal.jsx';
import AvatarActions from 'actions/Avatar.js';
import AvatarStore from 'stores/user/Avatar.js';


export class EditPicture extends StoreObserver {

  constructor(props, context) {
    super(props, context, AvatarStore);

    this.ctrl = props.controller;
    this.ctrl.attachSubmit(AvatarActions.update);
  }

  onStore(store) {
    const newState = Object.assign({}, this.state);

    if (store.error) {
      this.ctrl.messageCallback({
        title: 'Some error occurred when updating your profile picture',
        content: String(store.error),
        type: 'Alert',
      });
    } else {
      this.ctrl.toggle(false);
    }

    this.setState(newState);
  }

  render() {
    return (
      <FileModal
        {...this.props}
        layoutStyle="LayoutDark Tight"
        title="Edit Profile Picture"
        inputHolder="New Picture"
        inputLabel="picture"
        sizeWarning="Please verify your file does not exceed 5mb"
      />
    );
  }
}
