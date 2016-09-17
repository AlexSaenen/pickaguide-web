import React from 'react';

import { HomeMenu } from './menu/HomeMenu.jsx';
import BodyContainer from './BodyContainer.jsx';
import Footer from './Footer.jsx';

import 'scss/components/_home.scss';

export class HomePage extends React.Component {
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
            <BodyContainer />
            <Footer />
          </div>
        );
    }
}

HomePage.propTypes = {
    user: React.PropTypes.shape({
        id: React.PropTypes.number.isRequired,
        name: React.PropTypes.string,
    }),
};
