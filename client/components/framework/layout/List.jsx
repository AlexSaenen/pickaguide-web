import React from 'react';

import { PropsComponent } from 'base/PropsComponent.jsx';
import { Element } from 'layout/Element.jsx';

import 'scss/framework/list.scss';
import 'scss/framework/layout.scss';


export class List extends PropsComponent {

  constructor(props, context) {
    super(props, context);

    this.state = { listStyle: props.listStyle };
    this.wrapChildren = props.wrapChildren;
  }

  render() {
    return (
      <div className={`List ${this.state.listStyle}`}>
        {
          this.wrapChildren ?
          this.props.children.forEach(child =>
            <Element>
              {child}
            </Element>
          ) :
          this.props.children
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
