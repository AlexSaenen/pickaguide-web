import React from 'react';

import { PropsComponent } from 'base/PropsComponent.jsx';
import { ModalFormController } from 'base/ModalFormController.jsx';
import { Modal } from 'layout/containers/Modal.jsx';
import { Form } from 'layout/form/Form.jsx';


export class ModalForm extends PropsComponent {

  constructor(props, context) {
    super(props, context);

    this.ctrl = props.controller;
  }

  render() {
    return (
      <Modal {...this.props} controller={this.ctrl}>
        <Form {...this.props} onSubmit={this.ctrl.submit} onReset={this.ctrl.reset}>
          {this.props.children}
        </Form>
      </Modal>
    );
  }
}

ModalForm.defaultProps = {
  controller: new ModalFormController(),
};

ModalForm.propTypes = {
  children: React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.array]),
  controller: React.PropTypes.object,
};
