import React from 'react';

import { SubmitButton } from 'form/SubmitButton.jsx';
import { Button } from 'layout/elements/Button.jsx';
import { Message } from 'layout/elements/Message.jsx';
import { PropsComponent } from 'base/PropsComponent.jsx';
import { Layout } from 'layout/containers/Layout.jsx';

import 'scss/framework/form.scss';


export class Form extends PropsComponent {

  constructor(props, context) {
    super(props, context);

    this.state = { layoutStyle: props.layoutStyle, message: this.emptyMessage() };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.reset = this.reset.bind(this);
    this.clearMessage = this.clearMessage.bind(this);
    this.displayMessage = this.displayMessage.bind(this);
    this.setMessage = this.setMessage.bind(this);
    this.pendingMessage = null;
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
    const inputs = this.form.querySelectorAll('input, textarea');
    const fields = {};

    inputs.forEach((el, index) => {
      if (index < inputs.length - 1) {
        if (el.type === 'file') {
          fields[el.name] = el.files[0];
        } else {
          fields[el.name] = el.value;
        }
      }
    });

    this.props.onSubmit(fields, this.setMessage, this);
  }

  emptyMessage() {
    return ({ title: '', content: '', type: '' });
  }

  setMessage(message, isPending = true) {
    this.pendingMessage = message;

    if (isPending === false) {
      this.displayMessage(this.pendingMessage);
    }
  }

  displayMessage(message) {
    const newState = Object.assign({}, this.state);
    newState.message = message;
    this.updateState(newState);
  }

  clearMessage() {
    this.displayMessage(this.emptyMessage());
  }

  reset() {
    this.form.reset();
  }

  render() {
    return (
      <Layout layoutStyle={this.state.layoutStyle}>
        <form className="FormWrapper" onSubmit={this.handleSubmit} ref={(el) => { this.form = el; }}>
          {this.props.children}
          <Button
            buttonStyle="Red Auto Inline"
            label="Reset"
            onCallback={this.reset}
          />
          <SubmitButton label={this.props.submitLabel} />
        </form>
        <Message {...this.state.message} messageStyle="TopMargin" onDismiss={this.clearMessage} />
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
  onSubmit: React.PropTypes.func.isRequired,
};
