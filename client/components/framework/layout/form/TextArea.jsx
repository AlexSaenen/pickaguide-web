import React from 'react';

import { PropsComponent } from 'base/PropsComponent.jsx';

import 'scss/framework/form.scss';


export class TextArea extends PropsComponent {

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
      className: props.className,
    };

    this.handleEdit = this.handleEdit.bind(this);
  }

  handleEdit(e) {
    e.preventDefault();
    const newState = Object.assign({}, this.state);
    newState.value = e.target.value;
    this.updateState(newState);
  }

  componentWillReceiveProps(nextProps) {
    this.cache = this.state.value;
    super.componentWillReceiveProps(nextProps);
  }

  render() {
    const props = {
      name: this.state.label,
      value: this.cache || this.state.value,
      placeholder: this.state.placeholder.capitalize(),
      onChange: this.handleEdit,
    };

    this.cache = null;

    if (this.state.required) {
      props.required = 'required';
    }

    return (
      <div className={this.state.className}>
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
  className: '',
};

TextArea.propTypes = {
  className: React.PropTypes.string,
  label: React.PropTypes.string,
  id: React.PropTypes.string,
  value: React.PropTypes.string,
  rows: React.PropTypes.string,
  cols: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  required: React.PropTypes.bool,
};
