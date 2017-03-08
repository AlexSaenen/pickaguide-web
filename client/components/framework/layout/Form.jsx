import React from 'react';

import { SubmitButton } from 'form/SubmitButton.jsx';
import { Message } from 'layout/Message.jsx';
import { PropsComponent } from 'base/PropsComponent.jsx';
import { Layout } from 'layout/Layout.jsx';
import FormStore from 'stores/CurrentForm.js';
import FormActions from 'actions/CurrentForm.js';

import 'scss/framework/form.scss';


export class Form extends PropsComponent {

  constructor(props, context) {
    super(props, context);

    this.state = { layoutStyle: props.layoutStyle, message: props.message };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearMessage = this.clearMessage.bind(this);
  }

  componentWillUnmount() {
    FormActions.flush.defer();
  }

  handleSubmit(e) {
    e.preventDefault();
    const formChildren = Array.from(e.target.children);
    const submitElement = formChildren.slice(-1).pop();
    const submitName = submitElement.childNodes[0].value;
    this.props.onSubmit(FormStore.getState().fields, submitName);
  }

  clearMessage() {
    const stateCopy = Object.assign({}, this.state);
    stateCopy.message = { title: '', content: '', type: '' };
    this.updateState(stateCopy);
  }

  render() {
    return (
      <Layout layoutStyle={this.state.layoutStyle}>
        <form className="FormWrapper" onSubmit={this.handleSubmit}>
          {this.props.children}
          <SubmitButton label={this.props.submitLabel} />
        </form>
        <Message {...this.state.message} onDismiss={this.clearMessage} />
      </Layout>
    );
  }
}

Form.defaultProps = {
  message: {
    title: '',
    content: '',
    type: '',
  },
  submitLabel: 'Submit',
  layoutStyle: 'LayoutDark',
};

Form.propTypes = {
  children: React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.array]),
  submitLabel: React.PropTypes.string,
  layoutStyle: React.PropTypes.string,
};
