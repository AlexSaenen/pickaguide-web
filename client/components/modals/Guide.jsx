import React from 'react';
import { browserHistory } from 'react-router';

import { StoreObserver } from 'base/StoreObserver.jsx';
import { ModalForm } from 'view/ModalForm.jsx';
import { Title } from 'layout/elements/Title.jsx';
import { TextInput } from 'form/TextInput.jsx';
import { TextArea } from 'form/TextArea.jsx';
import ProfileActions from 'actions/Profile.js';
import ProfileStore from 'stores/user/Profile.js';


export class Guide extends StoreObserver {

  constructor(props, context) {
    super(props, context, ProfileStore);
    this.state = {
      profile: ProfileStore.getState().profile,
    };

    this.onStoreChange = this.onStoreChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onClose = this.onClose.bind(this);
    this.messageCallback = () => {};
  }

  onStoreChange(store) {
    const stateCopy = Object.assign({}, this.state);
    stateCopy.profile = store.profile;

    if (store.error) {
      this.messageCallback({
        title: 'Some error occurred when you want to become guide',
        content: String(store.error),
        type: 'Alert',
      });
    } else if (store.isGuide) {
      this.onClose();
    }

    this.setState(stateCopy);
  }

  onClose() {
    browserHistory.goBack();
  }

  handleSubmit(form, submitName, messageCallback) {
    this.messageCallback = messageCallback;
    ProfileActions.becomeGuide(Object.assign(form, this.state.profile));
  }

  render() {
    const profile = this.state.profile || {};
    const shouldDisplay = attribute => (attribute ? 'Hidden' : '');

    return (
      <ModalForm {...this.props} layoutStyle="LayoutDark Tight" modalStyle="Large" onSubmit={this.handleSubmit} onClose={this.onClose}>
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
