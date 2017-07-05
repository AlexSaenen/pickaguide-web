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
      this.ctrl.closeAndReset();
    }

    this.setState(newState);
  }

  onClose() {
    browserHistory.goBack();
  }

  onSubmit(form) {
    UserActions.becomeGuide(form);
  }

  render() {
    const profile = this.state.profile || {};
    const neededAttrs = ['firstName', 'lastName', 'phone', 'city', 'country'];
    const attrNameMapping = {
      firstName: 'First name',
      lastName: 'Last name',
    };

    const inputs = neededAttrs
      .filter(attr => !profile[attr])
      .map((attr, index) => <TextInput key={index} value={profile[attr]} label={attr} placeholder={attrNameMapping[attr] || attr} required />);

    return (
      <ModalForm controller={this.ctrl} {...this.props} layoutStyle="LayoutDark Tight" modalStyle="Large">
        <Title>Become Guide</Title>
        {inputs}
      </ModalForm>
    );
  }
}
