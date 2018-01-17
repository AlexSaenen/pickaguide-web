import React from 'react';

import { Button } from 'layout/elements/Button.jsx';
import { PropsComponent } from 'base/PropsComponent.jsx';
import { strings } from './Modal_lang.js'

import 'scss/framework/modal.scss';
import 'scss/framework/layout.scss';


export class Modal extends PropsComponent {

  constructor(props, context) {
    super(props, context);

    this.state = { modalStyle: props.modalStyle, active: props.active || false };
    this.ctrl = props.controller;
    this.ctrl.attachView(this);
  }

  render() {
    let classNames = `Modal ${this.state.modalStyle}`;
    let modalButtons = this.props.buttons ||
      (<Button
        label={strings.dismiss}
        buttonStyle="Red"
        onCallback={
          function callback(clickEvent) {
            this.ctrl.close(clickEvent.target);
          }.bind(this)
        }
      />);

    if (this.state.active === false) { classNames += ' Hidden'; }

    return (
      <div className={classNames}>
        <div className="ModalContent">
          {this.props.children}
          <div className="ModalFooter">
            {modalButtons}
          </div>
        </div>
      </div>
    );
  }
}

Modal.defaultProps = {
  modalStyle: '',
};

Modal.propTypes = {
  modalStyle: React.PropTypes.string,
  controller: React.PropTypes.object,
  active: React.PropTypes.bool,
};
