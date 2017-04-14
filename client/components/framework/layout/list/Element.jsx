import React from 'react';

import { PropsComponent } from 'base/PropsComponent.jsx';

import 'scss/framework/list.scss';


export class Element extends PropsComponent {

  render() {
    const classNames = `Element ${this.props.elementStyle}`;

    return (
      <div className={classNames}>
        {this.props.children}
      </div>
    );
  }
}

Element.defaultProps = {
  elementStyle: 'Auto',
};

Element.propTypes = {
  elementStyle: React.PropTypes.string,
};
