import React from 'react';

import 'scss/views/profiles.scss';


export class Notification extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      title: props.title,
      body: props.body,
      readAt: props.readAt,
    };
  }

  render() {
    return (
      <div className="Notification">
        {this.state.title} {this.state.body} {this.state.readAt}
      </div>
    );
  }
}

Notification.propTypes = {
  title: React.PropTypes.string.isRequired,
  body: React.PropTypes.string.isRequired,
  readAt: React.PropTypes.string,
};
