import React from 'react';

import 'scss/framework/layout.scss';


export class Button extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = props;
  }

  render() {
    return (
      <div className="ShadowedButton" onClick={this.state.onCallback}>
        {this.state.label}
      </div>
    );
  }
}

Button.propTypes = {
  label: React.PropTypes.string.isRequired,
  onCallback: React.PropTypes.func.isRequired,
};
