import React from 'react';

import { StoreObserver } from 'base/StoreObserver.jsx';
import { ModalForm } from 'view/ModalForm.jsx';
import { Title } from 'layout/elements/Title.jsx';
import { Information } from 'layout/elements/Information.jsx';
import { TextInput } from 'form/TextInput.jsx';
import { strings } from './ChangeStatus_lang.js';
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
        title: String(strings.error),
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
      <ModalForm controller={this.ctrl} {...this.props} layoutStyle="LayoutBlank Tight">
        <Title>{this.state.actionType.capitalize()}{strings.title}</Title>
        <br />
        <TextInput label="reason" displayLabel={strings.comment} placeholder={strings.comment} required value="No extra comment" />
        <Information infoStyle="Warning LineTight">{strings.info}</Information>
      </ModalForm>
    );
  }
}
