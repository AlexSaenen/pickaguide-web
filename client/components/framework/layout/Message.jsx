import React from 'react';

import { PropsComponent } from 'base/PropsComponent.jsx';

import 'scss/framework/message.scss';


export class Message extends PropsComponent {

  constructor(props, context) {
    super(props, context);

    this.state = {
      message: props.message,
    };

    this.messageTimeout = null;
  }

  componentWillUnmount() {
    if (this.messageTimeout) {
      clearTimeout(this.messageTimeout);
    }
  }

  dismiss() {
    const stateCopy = Object.assign({}, this.state);
    stateCopy.message.title = '';
    stateCopy.message.content = '';
    this.updateState(stateCopy);
  }

  render() {
    let classes = `Message ${this.state.message.type}`;

    if (this.state.message.content === '') {
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
        <div className="MessageTitle" name="MessageTitle">{this.state.message.title}</div>
        <div className="MessageContent" name="MessageContent">{this.state.message.content}</div>
      </div>
    );
  }
}

Message.propTypes = {
  message: React.PropTypes.shape({
    title: React.PropTypes.string,
    content: React.PropTypes.string,
    type: React.PropTypes.string,
  }),
};
