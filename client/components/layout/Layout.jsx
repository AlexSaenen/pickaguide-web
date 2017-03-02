import React from 'react';

import { PropsComponent } from 'base/PropsComponent.jsx';

import 'scss/components/base/layout.scss';


export class Layout extends PropsComponent {

  constructor(props, context) {
    super(props, context);

    this.state = props;
  }

  render() {
    const classNames = `LayoutContainer ${this.state.layoutStyle}`;

    return (
      <div className={classNames}>
        {this.state.children}
      </div>
    );
  }
}

Layout.defaultProps = {
  layoutStyle: 'LayoutDark',
};

Layout.propTypes = {
  children: React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.array]),
  layoutStyle: React.PropTypes.string,
};
