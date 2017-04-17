import React from 'react';

import 'scss/framework/layout/button.scss';


export class Button extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = props;
  }

  render() {
    const classNames = `ShadowedButton ${this.state.buttonStyle}`;

    return (
      <div className={classNames} onClick={this.state.onCallback}>
        {this.state.label}
      </div>
    );
  }
}

Button.defaultProps = {
  buttonStyle: '',
};

Button.propTypes = {
  label: React.PropTypes.string.isRequired,
  onCallback: React.PropTypes.func.isRequired,
  buttonStyle: React.PropTypes.string,
};
