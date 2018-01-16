import React from 'react';

import 'scss/framework/layout/button.scss';


export class Button extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = props;
  }

  componentWillReceiveProps(nextProps) {
    const nextState = Object.assign({}, this.state);
    nextState.label = nextProps.label;
    nextState.buttonStyle = nextProps.buttonStyle;
    nextState.onCallback = nextProps.onCallback;
    nextState.disabled = nextProps.disabled;
    this.setState(nextState);
  }

  render() {
    const classNames = `ShadowedButton ${this.state.buttonStyle} ${this.state.disabled ? 'Disabled' : ''}`;

    return (
      <div className={classNames} onClick={this.state.disabled === false && this.state.onCallback}>
        {this.state.label}
      </div>
    );
  }
}

Button.defaultProps = {
  buttonStyle: '',
  disabled: false,
};

Button.propTypes = {
  label: React.PropTypes.string.isRequired,
  onCallback: React.PropTypes.func.isRequired,
  buttonStyle: React.PropTypes.string,
  disabled: React.PropTypes.bool,
};
