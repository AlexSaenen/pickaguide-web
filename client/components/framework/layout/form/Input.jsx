import React from 'react';

import { PropsComponent } from 'base/PropsComponent.jsx';

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
      defaultValue: props.defaultValue,
      min: props.min,
      max: props.max,
      step: props.step,
    };

    this.overrideState = props.override;
    this.handleEdit = this.handleEdit.bind(this);
    this.editMiddleware = props.onChange || (() => {});
  }

  handleEdit(e) {
    e.preventDefault();

    const newState = Object.assign({}, this.state);
    newState.value = e.target.value;
    this.editMiddleware(newState.value);
    if (this.override !== true) {
      this.updateState(newState);
    }
  }

  componentWillReceiveProps(nextProps) {
    this.cache = this.state.value;
    if (this.overrideState) {
      this.cache = undefined;
    }
    super.componentWillReceiveProps(nextProps);
  }

  render() {
    const props = {
      type: this.state.type,
      name: this.state.label,
      id: this.state.label,
      value: this.cache || this.state.value,
      placeholder: this.state.placeholder.capitalize(),
      onChange: this.handleEdit,
    };

    this.cache = null;

    if (this.state.required) {
      props.required = 'required';
    }

    ['min', 'max', 'step', 'defaultValue'].forEach((field) => {
      if (this.state[field] !== undefined) {
        props[field] = this.state[field];
      }
    });

    if (props.defaultValue !== undefined && props.value === '') {
      delete props.value;
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
  max: React.PropTypes.number,
  min: React.PropTypes.number,
  step: React.PropTypes.number,
  placeholder: React.PropTypes.string,
  required: React.PropTypes.bool,
  inline: React.PropTypes.bool,
};
