import React from 'react';

import 'scss/components/formFramework/message.scss';

export class Message extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      message: props.payload,
    };
  }

  componentWillReceiveProps(props) {
    const stateCopy = Object.assign({}, this.state);
    stateCopy.message = props.payload;
    this.setState(stateCopy);
  }

  render() {
    let classes = `MessageContainer ${this.state.message.type}`;

    if (this.state.message.content === '') {
      classes += ' Hide';
    }

    return (
      <div className={classes}>
        <div className="MessageTitle">{this.state.message.title}</div>
        <div className="MessageContent">{this.state.message.content}</div>
      </div>
    );
  }
}

Message.propTypes = {
  payload: React.PropTypes.shape({
    title: React.PropTypes.string,
    content: React.PropTypes.string,
    type: React.PropTypes.string,
  }),
};
