import React from 'react';

import { PropsComponent } from 'base/PropsComponent.jsx';
import { ModalForm } from 'view/ModalForm.jsx';
import { Title } from 'layout/elements/Title.jsx';
import { FileInput } from 'form/FileInput.jsx';


export class FileModal extends PropsComponent {

  constructor(props, context) {
    super(props, context);

    this.state = {
      title: props.title,
      inputLabel: props.inputLabel,
      inputHolder: props.inputHolder,
    };
  }

  render() {
    return (
      <ModalForm {...this.props} modalStyle="Small">
        <Title>{this.state.title}</Title>
        <FileInput placeholder={this.state.inputHolder} label={this.state.inputLabel} />
      </ModalForm>
    );
  }
}

FileModal.defaultProps = {
  title: 'Open File',
  inputLabel: 'file',
};

FileModal.propTypes = {
  title: React.PropTypes.string,
  inputLabel: React.PropTypes.string,
  inputHolder: React.PropTypes.string,
};
