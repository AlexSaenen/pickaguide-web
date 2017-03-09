import React from 'react';

import { SubmitButton } from 'form/SubmitButton.jsx';
import { PropsComponent } from 'base/PropsComponent.jsx';
// import FormActions from 'actions/CurrentForm.js';
import FormStore from 'stores/CurrentForm.js';

import 'scss/framework/form.scss';


export class InlineForm extends PropsComponent {

  constructor(props, context) {
    super(props, context);

    this.state = props;
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.state.onSubmit(FormStore.getState().fields);
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
