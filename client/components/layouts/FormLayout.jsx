import React from 'react';

import { SubmitButton } from 'formFramework/SubmitButton.jsx';
import { Message } from 'formFramework/Message.jsx';
import { PropsComponent } from 'base/PropsComponent.jsx';
import { Layout } from 'layoutFramework/Layout.jsx';
import FormStore from 'stores/CurrentForm.js';
import FormActions from 'actions/CurrentForm.js';

import 'scss/components/_form.scss';


export class FormLayout extends PropsComponent {

  constructor(props, context) {
    super(props, context);

    this.state = props;
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillUnmount() {
    FormActions.flush.defer();
  }

  handleSubmit(e) {
    e.preventDefault();
    const formChildren = Array.from(e.target.children);
    const submitElement = formChildren.slice(-1).pop();
    const submitName = submitElement.childNodes[0].value;
    this.state.onSubmit(FormStore.getState().fields, submitName);
  }

  render() {
    return (
      <Layout layoutStyle={this.state.layoutStyle}>
        <form className="FormWrapper" onSubmit={this.handleSubmit}>
          {this.state.children}
          <SubmitButton label={this.state.submitLabel} />
        </form>
        <Message message={this.state.message} />
      </Layout>
    );
  }
}

FormLayout.defaultProps = {
  message: {
    content: '',
    type: 'Empty',
  },
  submitLabel: 'Submit',
  layoutStyle: 'LayoutDark',
};

FormLayout.propTypes = {
  message: React.PropTypes.shape({
    content: React.PropTypes.string,
    type: React.PropTypes.string,
  }),
  children: React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.array]),
  submitLabel: React.PropTypes.string,
  layoutStyle: React.PropTypes.string,
};
