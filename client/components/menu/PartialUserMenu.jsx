import React from 'react';

import 'scss/components/_home.scss';
import 'scss/components/menu/_partialUserMenu.scss';

export class PartialUserMenu extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            user: props.user,
        };
    }

    render() {
        return (
          <div className={'MenuElement PartialUserMenu'}>
            <div className={'PartialUserMenuContentWrapper'}>
              <a className={'AccountLogo'} href="#">
                <img src="/assets/images/logo.png" alt="Profile" />
              </a>
            </div>
          </div>
        );
    }
}

PartialUserMenu.propTypes = {
    user: React.PropTypes.shape({
        id: React.PropTypes.number.isRequired,
        name: React.PropTypes.string,
    }),
};
