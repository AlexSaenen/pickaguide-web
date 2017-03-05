import React from 'react';

import { PropsComponent } from 'base/PropsComponent.jsx';
import { Modal } from 'layout/Modal.jsx';
import { Form } from 'layout/Form.jsx';


export class ModalForm extends PropsComponent {

  constructor(props, context) {
    super(props, context);

    this.state = props;
  }

  render() {
    return (
      <Modal {...this.state}>
        <Form {...this.state} >
          {this.state.children}
        </Form>
      </Modal>
    );
  }
}

ModalForm.defaultProps = {
  active: false,
};

ModalForm.propTypes = {
  children: React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.array]),
  active: React.PropTypes.bool,
};
