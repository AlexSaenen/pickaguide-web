import React from 'react';

import { SubmitButton } from 'form/SubmitButton.jsx';
import { PropsComponent } from 'base/PropsComponent.jsx';
import { strings } from './strings_lang.js'

import 'scss/framework/form.scss';


export class InlineForm extends PropsComponent {

  constructor(props, context) {
    super(props, context);

    this.state = props;
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const inputs = e.target.querySelectorAll('input, textarea');
    const fields = {};

    inputs.forEach((el, index) => {
      if (index < inputs.length - 1) {
        fields[el.name] = el.value;
      }
    });

    this.state.onSubmit(fields);
  }

  render() {
    return (
      <div className="InlineForm">
        <form className="FormWrapper" onSubmit={this.handleSubmit}>
          {this.props.children}
          <SubmitButton className="FormElement" buttonStyle="LessMarginTop" label={this.state.submitLabel} />
        </form>
      </div>
    );
  }
}

InlineForm.defaultProps = {
  submitLabel: String(strings.submit),
};

InlineForm.propTypes = {
  children: React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.array]),
  submitLabel: React.PropTypes.string,
};
