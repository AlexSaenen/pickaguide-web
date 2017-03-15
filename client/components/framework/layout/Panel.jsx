import React from 'react';

import { PropsComponent } from 'base/PropsComponent.jsx';

import 'scss/framework/layout.scss';
import 'scss/framework/panel.scss';


export class Panel extends PropsComponent {

  constructor(props, context) {
    super(props, context);

    this.state = { panelStyle: props.panelStyle };
  }

  render() {
    return (
      <div className={`Panel ${this.state.panelStyle}`}>
        {this.props.children}
      </div>
    );
  }
}

Panel.defaultProps = {
  panelStyle: 'Large',
};

Panel.propTypes = {
  panelStyle: React.PropTypes.string,
  children: React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.array]),
};
