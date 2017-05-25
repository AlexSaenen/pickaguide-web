import React from 'react';

import { PropsComponent } from 'base/PropsComponent.jsx';
import FormActions from 'actions/CurrentForm.js';
import FormStore from 'stores/CurrentForm.js';

import 'scss/framework/form.scss';


export class Input extends PropsComponent {

  constructor(props, context) {
    super(props, context);

    this.state = {
      type: props.type,
      label: props.label || props.type || 'input',
      id: props.id || props.label || props.type || 'input',
      value: props.value,
      placeholder: props.placeholder || props.label || props.type,
      required: props.required,
      inline: props.inline,
      className: props.className,
    };

    if (this.state.value && this.state.value !== '') {
      FormActions.updateValue({ label: this.state.label, value: this.state.value });
    }

    this.handleEdit = this.handleEdit.bind(this);
  }

  handleEdit(e) {
    e.preventDefault();
    FormActions.updateValue({ label: e.target.name, value: e.target.value });

    const newState = Object.assign({}, this.state);

    newState.value = e.target.value;
    this.updateState(newState);
  }

  render() {
    const props = {
      type: this.state.type,
      name: this.state.label,
      id: this.state.label,
      value: this.state.value,
      placeholder: this.state.placeholder.capitalize(),
      onChange: this.handleEdit,
    };

    const savedFields = FormStore.getState().fields;

    if (props.value === '' && savedFields[this.state.id]) {
      props.value = savedFields[this.state.id];
    }

    if (this.state.required) {
      props.required = 'required';
    }

    return (
      <div className={this.state.className}>
        <input {...props} />
        {this.state.inline === false ? <span><br /><br /></span> : ''}
      </div>
    );
  }
}

Input.defaultProps = {
  type: 'text',
  value: '',
  required: false,
  inline: false,
  className: '',
};

Input.propTypes = {
  className: React.PropTypes.string,
  type: React.PropTypes.string,
  label: React.PropTypes.string,
  id: React.PropTypes.string,
  value: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  required: React.PropTypes.bool,
  inline: React.PropTypes.bool,
};
