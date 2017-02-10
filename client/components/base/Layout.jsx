import React from 'react';

import { PropsComponent } from 'base/PropsComponent.jsx';

import 'scss/components/base/layout.scss';


export class Layout extends PropsComponent {

  constructor(props, context) {
    super(props, context);

    this.state = props;
  }

  render() {
    return (
      <div className="LayoutContainer">
        {this.state.children}
      </div>
    );
  }
}

Layout.propTypes = {
  children: React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.array]),
};
