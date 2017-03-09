import React from 'react';

import { PropsComponent } from 'base/PropsComponent.jsx';

import 'scss/framework/layout.scss';


export class Panel extends PropsComponent {

  render() {
    console.log('Panel.render()');
    return (
      <div className="Panel">
        {this.props.children}
      </div>
    );
  }
}

Panel.propTypes = {
  children: React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.array]),
};
