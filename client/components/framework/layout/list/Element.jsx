import React from 'react';

import { PropsComponent } from 'base/PropsComponent.jsx';

import 'scss/framework/list.scss';


export class Element extends PropsComponent {

  render() {
    const classNames = `Element ${this.props.elementStyle}`;

    return (
      <div className={classNames} onClick={this.props.onClick}>
        {this.props.children}
      </div>
    );
  }
}

Element.defaultProps = {
  elementStyle: 'Auto',
  onClick: () => {},
};

Element.propTypes = {
  elementStyle: React.PropTypes.string,
  onClick: React.PropTypes.func,
};
