import React from 'react';

import MainMenu from './MainMenu.jsx';
import { PartialUserMenu } from './PartialUserMenu.jsx';

import 'scss/components/_home.scss';

export class HomeMenu extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      userConnected: props.user,
    };
  }

  render() {
    return (
      <div className={'MainMenuWrapper'}>
        <MainMenu />
        <PartialUserMenu user={this.state.userConnected} />
      </div>
    );
  }
}

HomeMenu.propTypes = {
  user: React.PropTypes.shape({
    id: React.PropTypes.number.isRequired,
    name: React.PropTypes.string,
  }),
};
