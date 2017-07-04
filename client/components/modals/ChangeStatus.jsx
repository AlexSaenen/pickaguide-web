import React from 'react';

import { StoreObserver } from 'base/StoreObserver.jsx';
import { ModalForm } from 'view/ModalForm.jsx';
import { Title } from 'layout/elements/Title.jsx';
import { Information } from 'layout/elements/Information.jsx';
import { TextInput } from 'form/TextInput.jsx';
import VisitsActions from 'actions/Visits.js';
import VisitsStore from 'stores/user/Visits.js';


export class ChangeStatus extends StoreObserver {

  constructor(props, context) {
    super(props, context, VisitsStore);

    this.state = { actionType: 'none', callerId: 'none' };
    props.controller.attachFeeder(this.onFeed.bind(this));
    this.ctrl = props.controller;
    this.ctrl.attachSubmit(this.sumbitStatus.bind(this));
  }

  onFeed(set) {
    const newState = Object.assign({}, this.state);
    newState.callerId = set.callerId;
    newState.actionType = set.actionType;
    this.setState(newState);
  }

  onStore(store) {
    const newState = Object.assign({}, this.state);

    if (store.error) {
      this.ctrl.messageCallback({
        title: 'Some error occurred when updating your password',
        content: String(store.error),
        type: 'Alert',
      });

      this.setState(newState);
    } else {
      this.ctrl.closeAndReset();
    }
  }

  sumbitStatus(form) {
    form.callerId = this.state.callerId;
    VisitsActions[this.state.actionType](form);
  }

  render() {
    return (
      <ModalForm controller={this.ctrl} {...this.props} layoutStyle="LayoutDark Tight">
        <Title>{this.state.actionType.capitalize()} this visit</Title>
        <TextInput label="reason" defaultValue="No extra comment" />
        <Information infoStyle="Info LineTight">This action cannot be undone</Information>
      </ModalForm>
    );
  }
}
