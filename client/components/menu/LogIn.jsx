import React from 'react';

import { HomeMenu } from './HomeMenu.jsx';

import 'scss/components/_home.scss';

export class LogIn extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            userConnected: props.user,
        };
    }

    render() {
        return (
          <div>
            <HomeMenu user={this.state.userConnected} />
            <div>LogIn</div>
          </div>
        );
    }
}

LogIn.propTypes = {
    user: React.PropTypes.shape({
        id: React.PropTypes.number.isRequired,
        name: React.PropTypes.string,
    }),
};
