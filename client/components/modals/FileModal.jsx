import React from 'react';

import { PropsComponent } from 'base/PropsComponent.jsx';
import { ModalForm } from 'view/ModalForm.jsx';
import { Title } from 'layout/elements/Title.jsx';
import { Information } from 'layout/elements/Information.jsx';
import { FileInput } from 'form/FileInput.jsx';
import { strings } from './FileModal_lang.js'


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
      <ModalForm {...this.props} modalStyle="Medium">
        <Title>{this.state.title}</Title>
        <br className="Margin" />
        {
          this.state.sizeWarning !== '' &&
            <Information infoStyle="Info Auto MarginAuto AllSpaced">{this.state.sizeWarning}</Information>
        }
        <FileInput displayLabel={false} className="TopMargin" placeholder={this.state.inputHolder} label={this.state.inputLabel} required />
      </ModalForm>
    );
  }
}

FileModal.defaultProps = {
  title: String(strings.title),
  inputLabel: String(strings.inputLabel),
  sizeWarning: '',
};

FileModal.propTypes = {
  title: React.PropTypes.string,
  inputLabel: React.PropTypes.string,
  inputHolder: React.PropTypes.string,
  sizeWarning: React.PropTypes.string,
};
