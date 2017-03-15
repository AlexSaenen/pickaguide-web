import React from 'react';

import { PropsComponent } from 'base/PropsComponent.jsx';

import 'scss/framework/message.scss';


export class Message extends PropsComponent {

  constructor(props, context) {
    super(props, context);

    this.state = props;
    this.messageTimeout = null;
  }

  componentWillUnmount() {
    if (this.messageTimeout) {
      clearTimeout(this.messageTimeout);
    }
  }

  dismiss() {
    this.state.onDismiss(this);
  }

  render() {
    let classes = `Message ${this.state.type}`;

    if (this.state.content === '') {
      classes += ' Hidden';
    } else {
      if (this.messageTimeout) {
        clearTimeout(this.messageTimeout);
      }

      this.messageTimeout = setTimeout(() => {
        this.dismiss();
        this.messageTimeout = null;
      }, 5000);
    }

    return (
      <div className={classes}>
        <div className="MessageTitle" name="MessageTitle">{this.state.title}</div>
        <div className="MessageContent" name="MessageContent">{this.state.content}</div>
      </div>
    );
  }
}

Message.propTypes = {
  message: React.PropTypes.shape({
    title: React.PropTypes.string.isRequired,
    content: React.PropTypes.string.isRequired,
    type: React.PropTypes.string.isRequired,
  }),
  onDismiss: React.PropTypes.func.isRequired,
};
