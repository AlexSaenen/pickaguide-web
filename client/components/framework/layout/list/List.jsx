import React from 'react';

import { PropsComponent } from 'base/PropsComponent.jsx';
import { Element } from 'layout/list/Element.jsx';

import 'scss/framework/list.scss';
import 'scss/framework/layout.scss';


export class List extends PropsComponent {

  constructor(props, context) {
    super(props, context);

    this.state = { listStyle: props.listStyle };
    this.wrapChildren = props.wrapChildren;
  }

  render() {
    const props = Object.assign({}, this.props);

    if (props.children.constructor !== Array) {
      props.children = [props.children];
    }

    return (
      <div className={`List ${this.state.listStyle}`}>
        {
          this.wrapChildren ?
          props.children.map((child, index) => {
            return (
              <Element key={index} elementStyle={this.props.elementStyle}>
                {child}
              </Element>
            );
          }) :
          props.children
        }
      </div>
    );
  }
}

List.defaultProps = {
  listStyle: 'ListStack',
  wrapChildren: true,
};

List.propTypes = {
  listStyle: React.PropTypes.string,
  wrapChildren: React.PropTypes.bool,
};
