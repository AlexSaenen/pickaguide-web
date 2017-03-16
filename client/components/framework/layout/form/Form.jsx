import React from 'react';

import { SubmitButton } from 'form/SubmitButton.jsx';
import { Message } from 'layout/elements/Message.jsx';
import { PropsComponent } from 'base/PropsComponent.jsx';
import { Layout } from 'layout/containers/Layout.jsx';
import FormStore from 'stores/CurrentForm.js';
import FormActions from 'actions/CurrentForm.js';

import 'scss/framework/form.scss';


export class Form extends PropsComponent {

  constructor(props, context) {
    super(props, context);

    this.state = { layoutStyle: props.layoutStyle, message: this.emptyMessage() };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearMessage = this.clearMessage.bind(this);
    this.displayMessage = this.displayMessage.bind(this);
    this.setPendingMessage = this.setPendingMessage.bind(this);
    this.pendingMessage = null;
  }

  componentWillUnmount() {
    FormActions.flush.defer();
  }

  componentWillReceiveProps(props) {
    if (this.pendingMessage) {
      this.displayMessage(this.pendingMessage);
      this.pendingMessage = null;
    }

    super.componentWillReceiveProps(props);
  }

  handleSubmit(e) {
    e.preventDefault();
    const formChildren = Array.from(e.target.children);
    const submitElement = formChildren.slice(-1).pop();
    const submitName = submitElement.childNodes[0].value;
    this.props.onSubmit(FormStore.getState().fields, submitName, this.setPendingMessage);
  }

  emptyMessage() {
    return ({ title: '', content: '', type: '' });
  }

  setPendingMessage(message) {
    this.pendingMessage = message;
  }

  displayMessage(message) {
    const stateCopy = Object.assign({}, this.state);
    stateCopy.message = message;
    this.updateState(stateCopy);
  }

  clearMessage() {
    this.displayMessage(this.emptyMessage());
  }

  render() {
    console.log('Form.render()', this.props);
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
  submitLabel: 'Submit',
  layoutStyle: 'LayoutDark',
};

Form.propTypes = {
  children: React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.array]),
  submitLabel: React.PropTypes.string,
  layoutStyle: React.PropTypes.string,
};
