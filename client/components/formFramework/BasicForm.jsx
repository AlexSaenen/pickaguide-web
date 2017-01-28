import React from 'react';

import { SubmitButton } from 'formFramework/SubmitButton.jsx';
import { Message } from 'formFramework/Message.jsx';
import { ParentComponent } from 'base/ParentComponent.jsx';
import FormStore from 'stores/CurrentForm.js';

import 'scss/components/_form.scss';


export class BasicForm extends ParentComponent {

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
      <div className="FormContainer">
        <form className="FormWrapper" onSubmit={this.handleSubmit}>
          {this.state.children}
          <SubmitButton label={this.state.submitLabel} />
        </form>
        <Message payload={this.state.message} />
      </div>
    );
  }
}

BasicForm.defaultProps = {
  message: {
    content: '',
    type: 'Empty',
  },
  submitLabel: 'Submit',
};

BasicForm.propTypes = {
  message: React.PropTypes.shape({
    content: React.PropTypes.string,
    type: React.PropTypes.string,
  }),
  children: React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.array]),
  submitLabel: React.PropTypes.string,
};
