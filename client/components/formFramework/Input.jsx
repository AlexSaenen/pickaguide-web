import React from 'react';

import FormActions from 'actions/CurrentForm.js';

import 'scss/components/_form.scss';


export class Input extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      type: props.type,
      label: props.label || props.type || 'input',
      id: props.id || props.label || props.type || 'input',
      value: props.value,
      placeholder: props.placeholder || props.label,
      required: props.required,
      inline: props.inline,
      className: props.className,
    };

    this.handleEdit = this.handleEdit.bind(this);
  }

  handleEdit(e) {
    e.preventDefault();
    FormActions.updateValue({ label: e.target.name, value: e.target.value });

    const stateCopy = Object.assign({}, this.state);

    stateCopy.value = e.target.value;
    this.setState(stateCopy);
  }

  render() {
    const props = {
      type: this.state.type,
      name: this.state.label,
      id: this.state.label,
      value: this.state.value,
      placeholder: this.state.placeholder,
      onStoreChange: this.handleEdit,
      maxLength: '50',
    };

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
