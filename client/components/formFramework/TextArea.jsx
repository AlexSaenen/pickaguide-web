import React from 'react';

import FormActions from 'actions/CurrentForm.js';

import 'scss/components/_form.scss';


export class TextArea extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      label: props.label,
      id: props.id || props.label || 'textarea',
      value: props.value,
      rows: props.rows,
      cols: props.cols,
      placeholder: props.placeholder || props.label,
      required: props.required,
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
      name: this.state.label,
      value: this.state.value,
      placeholder: this.state.placeholder,
      onChange: this.handleEdit,
    };

    if (this.state.required) {
      props.required = 'required';
    }

    return (
      <div>
        <textarea {...props} /><br /><br />
      </div>
    );
  }
}

TextArea.defaultProps = {
  label: 'textarea',
  value: '',
  rows: '10',
  cols: '50',
  required: false,
};

TextArea.propTypes = {
  label: React.PropTypes.string,
  id: React.PropTypes.string,
  value: React.PropTypes.string,
  rows: React.PropTypes.string,
  cols: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  required: React.PropTypes.bool,
};
