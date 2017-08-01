import React from 'react';

import { PropsComponent } from 'base/PropsComponent.jsx';
import { ModalForm } from 'view/ModalForm.jsx';
import { Title } from 'layout/elements/Title.jsx';
import { Information } from 'layout/elements/Information.jsx';
import { FileInput } from 'form/FileInput.jsx';


export class FileModal extends PropsComponent {

  constructor(props, context) {
    super(props, context);

    this.state = {
      title: props.title,
      inputLabel: props.inputLabel,
      inputHolder: props.inputHolder,
      sizeWarning: props.sizeWarning,
    };
  }

  render() {
    return (
      <ModalForm {...this.props} modalStyle="Small">
        <Title>{this.state.title}</Title>
        {
          this.state.sizeWarning !== '' &&
            <Information infoStyle="Info Auto">{this.state.sizeWarning}</Information>
        }
        <FileInput placeholder={this.state.inputHolder} label={this.state.inputLabel} required />
      </ModalForm>
    );
  }
}

FileModal.defaultProps = {
  title: 'Open File',
  inputLabel: 'file',
  sizeWarning: '',
};

FileModal.propTypes = {
  title: React.PropTypes.string,
  inputLabel: React.PropTypes.string,
  inputHolder: React.PropTypes.string,
  sizeWarning: React.PropTypes.string,
};
