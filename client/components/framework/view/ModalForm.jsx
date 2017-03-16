import React from 'react';

import { PropsComponent } from 'base/PropsComponent.jsx';
import { Modal } from 'layout/containers/Modal.jsx';
import { Form } from 'layout/form/Form.jsx';


export class ModalForm extends PropsComponent {

  render() {
    return (
      <Modal {...this.props}>
        <Form {...this.props} onSubmit={this.props.onSubmit} >
          {this.props.children}
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
  onSubmit: React.PropTypes.func.isRequired,
};
