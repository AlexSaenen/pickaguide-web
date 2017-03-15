import React from 'react';

import { PropsComponent } from 'base/PropsComponent.jsx';
import { List } from 'layout/list/List.jsx';

import 'scss/framework/list.scss';


export class Lister extends PropsComponent {

  render() {
    return (
      <div className="Lister ListContainer">
        <List {...this.props}>
          {this.props.children}
        </List>
      </div>
    );
  }
}

Lister.propTypes = {
  children: React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.array]),
};
