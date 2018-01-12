import React from 'react';

import { PropsComponent } from 'base/PropsComponent.jsx';
import { ModalForm } from 'view/ModalForm.jsx';
import { TextInput } from 'form/TextInput.jsx';
import { Title } from 'layout/elements/Title.jsx';


export class EditText extends PropsComponent {

  constructor(props, context) {
    super(props, context);

    this.state = { value: props.value, title: props.title, label: props.label };
    props.controller.attachFeeder(this.onFeed.bind(this));
  }

  onFeed(set) {
    const newState = Object.assign({}, this.state);
    newState.value = set.value;
    newState.title = set.title;
    newState.label = set.label;
    this.setState(newState);
  }

  render() {
    return (
      <ModalForm {...this.props} layoutStyle="LayoutLight Tight">
        <Title>{this.state.title}</Title>
        <br />
        <TextInput label={this.state.label} value={this.state.value} required />
      </ModalForm>
    );
  }
}

EditText.defaultProps = {
  value: '',
  title: 'Edit Text',
  label: 'text',
};

EditText.propTypes = {
  value: React.PropTypes.string,
  title: React.PropTypes.string,
  label: React.PropTypes.string,
};
