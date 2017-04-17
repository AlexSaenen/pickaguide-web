import React from 'react';

import { EditText } from 'modals/EditText.jsx';
import { ModalForm } from 'view/ModalForm.jsx';
import { TextArea } from 'form/TextArea.jsx';
import { Title } from 'layout/elements/Title.jsx';


export class EditTextArea extends EditText {

  handleClose() {
    this.props.onClose('textarea');
  }

  render() {
    return (
      <ModalForm {...this.props} layoutStyle="LayoutLight Tight" onClose={this.handleClose}>
        <Title>{this.props.title}</Title>
        <TextArea label={this.props.label} value={this.props.value} required />
      </ModalForm>
    );
  }
}

EditTextArea.propTypes = {
  onClose: React.PropTypes.func.isRequired,
};
