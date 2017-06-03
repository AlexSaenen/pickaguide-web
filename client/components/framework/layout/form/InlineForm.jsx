import React from 'react';

import { SubmitButton } from 'form/SubmitButton.jsx';
import { PropsComponent } from 'base/PropsComponent.jsx';

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
          <SubmitButton className="FormElement" label={this.state.submitLabel} />
        </form>
      </div>
    );
  }
}

InlineForm.defaultProps = {
  submitLabel: 'Submit',
};

InlineForm.propTypes = {
  children: React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.array]),
  submitLabel: React.PropTypes.string,
};
