import React from 'react';
import { Link } from 'react-router';

import 'scss/components/menu/_mainMenu.scss';

export class MenuEntry extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      link: props.href,
      title: props.title,
    };
  }

  render() {
    return (
      <div className={'MenuEntry'}>
        <Link to={this.state.link}>
          <p>{this.state.title}</p>
        </Link>
      </div>
    );
  }
}

MenuEntry.propTypes = {
  href: React.PropTypes.string,
  title: React.PropTypes.string,
};
