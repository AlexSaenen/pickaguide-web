import React from 'react';

import { PropsComponent } from 'base/PropsComponent.jsx';
import { ModalForm } from 'view/ModalForm.jsx';
import { TextArea } from 'form/TextArea.jsx';
import { Title } from 'layout/elements/Title.jsx';


export class EditTextArea extends PropsComponent {

  constructor(props, context) {
    super(props, context);

    this.state = { value: props.value, title: props.title, label: props.label };
  }

  render() {
    return (
      <ModalForm {...this.props} layoutStyle="LayoutLight Tight">
        <Title>{this.state.title}</Title>
        <TextArea label={this.state.label} value={this.state.value} required />
      </ModalForm>
    );
  }
}

EditTextArea.defaultProps = {
  value: '',
  title: 'Edit TextArea',
  label: 'textarea',
};

EditTextArea.propTypes = {
  value: React.PropTypes.string,
  title: React.PropTypes.string,
  label: React.PropTypes.string,
};
