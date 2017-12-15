import React from 'react';

import { PropsComponent } from 'base/PropsComponent.jsx';
import { CheckMark } from 'layout/elements/CheckMark.jsx';

import 'scss/framework/layout/user.scss';

export class ToggleCheckMark extends PropsComponent {

  constructor(props, context) {
    super(props, context);

    this.state = {
      active: props.active,
    };

    this.onToggle = props.onToggle;
  }

  render() {
    return (
      <div>
        <p className="arrow_box" style={{ display: 'inline-block', backgroundColor: '#5ba2ff', borderRadius: '0.4em', padding: '0.2em 0.6em', margin: '0 0.8em', color: 'white', verticalAlign: 'middle' }}>{this.state.active ? 'disable' : 'enable'}</p>
        <div onClick={this.onToggle} className={`ToggleCheckMark InlineBlock ${this.props.transition ? '' : 'NoTransition NoRadius'}`}>
          <CheckMark active={this.state.active} />
        </div>
      </div>
    );
  }
}

ToggleCheckMark.defaultProps = {
  transition: true,
};

ToggleCheckMark.propTypes = {
  onToggle: React.PropTypes.func.isRequired,
  active: React.PropTypes.bool.isRequired,
  transition: React.PropTypes.bool,
};
