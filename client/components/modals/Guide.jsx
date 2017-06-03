import React from 'react';
import { browserHistory } from 'react-router';

import { StoreObserver } from 'base/StoreObserver.jsx';
import { ModalForm } from 'view/ModalForm.jsx';
import { Title } from 'layout/elements/Title.jsx';
import { TextInput } from 'form/TextInput.jsx';
import { TextArea } from 'form/TextArea.jsx';
import UserActions from 'actions/User.js';
import ProfileStore from 'stores/user/Profile.js';
import UserStore from 'stores/user/User.js';


export class Guide extends StoreObserver {

  constructor(props, context) {
    super(props, context, [ProfileStore, UserStore]);

    this.state = { profile: ProfileStore.getState().profile };
    this.ctrl = props.controller;
    this.ctrl.attachSubmit(this.onSubmit.bind(this));
    this.ctrl.attachClose(this.onClose.bind(this));
  }

  onStore(store) {
    const newState = Object.assign({}, this.state);

    if (store.error) {
      this.ctrl.messageCallback({
        title: 'Some error occurred when you want to become guide',
        content: String(store.error),
        type: 'Alert',
      });
    } else if (store.profile !== undefined) {
      newState.profile = store.profile;
    } else if (store.isGuide) {
      this.ctrl.close();
    }

    this.setState(newState);
  }

  onClose() {
    browserHistory.goBack();
  }

  onSubmit(form) {
    UserActions.becomeGuide(Object.assign(form, this.state.profile));
  }

  render() {
    const profile = this.state.profile || {};
    const shouldDisplay = attribute => (attribute ? 'Hidden' : '');

    return (
      <ModalForm controller={this.ctrl} {...this.props} layoutStyle="LayoutDark Tight" modalStyle="Large">
        <Title>Become Guide</Title>
        <TextInput className={shouldDisplay(profile.firstName)} value={profile.firstName} label="firstName" placeholder="First name" required />
        <TextInput className={shouldDisplay(profile.lastName)} value={profile.lastName} label="lastName" placeholder="Last name" required />
        <TextInput className={shouldDisplay(profile.phone)} value={profile.phone} label="phone" required />
        <TextInput className={shouldDisplay(profile.city)} value={profile.city} label="city" required />
        <TextInput className={shouldDisplay(profile.country)} value={profile.country} label="country" required />
        <TextArea className={shouldDisplay(profile.description)} value={profile.description} label="description" required />
      </ModalForm>
    );
  }
}
