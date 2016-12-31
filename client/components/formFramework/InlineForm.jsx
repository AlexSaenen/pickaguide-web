import React from 'react';

import { SubmitButton } from '../formFramework/SubmitButton.jsx';
import FormActions from '../../actions/CurrentForm.js';
import FormStore from '../../stores/CurrentForm.js';

import 'scss/components/_form.scss';

export class InlineForm extends React.Component {
  constructor(props, context) {
    super(props, context);

    // FormActions.flush();
    this.state = props;
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(props) {
    // FormActions.flush();
    const stateCopy = Object.assign({}, this.state);
    stateCopy.body = props.children;
    this.setState(stateCopy);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.state.onSubmit(FormStore.getState().fields);
  }

  render() {
    return (
      <div className="InlineFormContainer">
        <form className="FormWrapper" onSubmit={this.handleSubmit}>
          {this.state.children}
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
