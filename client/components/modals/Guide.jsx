import React from 'react';

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
      profileInfo: ProfileStore.getState().profile,
    };

    this.onStoreChange = this.onStoreChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.messageCallback = () => {};
  }

  onStoreChange(store) {
    const stateCopy = Object.assign({}, this.state);
    stateCopy.profileInfo = store.profile;

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
    ProfileActions.becomeGuide(Object.assign(form, this.state.profileInfo));
  }

  render() {
    const classes = [6];
    if (this.state.profileInfo !== null) {
      classes[0] = this.state.profileInfo.firstName ? 'Hidden' : '';
      classes[1] = this.state.profileInfo.lastName ? 'Hidden' : '';
      classes[2] = this.state.profileInfo.phone ? 'Hidden' : '';
      classes[3] = this.state.profileInfo.city ? 'Hidden' : '';
      classes[4] = this.state.profileInfo.country ? 'Hidden' : '';
      classes[5] = this.state.profileInfo.description ? 'Hidden' : '';
    }

    return (
      <ModalForm {...this.props} layoutStyle="LayoutDark Tight" modalStyle="Large" onSubmit={this.handleSubmit}>
        <Title>Become Guide</Title>
        <TextInput className={classes[0]} value={this.state.profileInfo.firstName} label="firstName" placeholder="First name" required />
        <TextInput className={classes[1]} value={this.state.profileInfo.lastName} label="lastName" placeholder="Last name" required />
        <TextInput className={classes[2]} value={this.state.profileInfo.phone} label="phone" required />
        <TextInput className={classes[3]} value={this.state.profileInfo.city} label="city" required />
        <TextInput className={classes[4]} value={this.state.profileInfo.country} label="country" required />
        <TextArea className={classes[5]} value={this.state.profileInfo.description} label="description" required />
      </ModalForm>
    );
  }
}
