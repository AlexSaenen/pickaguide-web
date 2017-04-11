import React from 'react';

import { PropsComponent } from 'base/PropsComponent.jsx';
import { ModalForm } from 'view/ModalForm.jsx';
import { TextInput } from 'form/TextInput.jsx';
import { Title } from 'layout/elements/Title.jsx';


export class EditText extends PropsComponent {

  constructor(props, context) {
    super(props, context);

    this.state = { value: props.value };
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.props.onClose('text');
  }

  render() {
    return (
      <ModalForm {...this.props} layoutStyle="LayoutLight Tight" onClose={this.handleClose}>
        <Title>{this.props.title}</Title>
        <TextInput label={this.props.label} value={this.props.value} required />
      </ModalForm>
    );
  }
}

EditText.propTypes = {
  onSubmit: React.PropTypes.func.isRequired,
  onClose: React.PropTypes.func.isRequired,
};
