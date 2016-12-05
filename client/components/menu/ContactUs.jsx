import React from 'react';
import { browserHistory } from 'react-router'

import { HomeMenu } from './HomeMenu.jsx';
import ContactAction from '../../actions/ContactUs.js';
import User from '../../stores/User.js';

import 'scss/components/_home.scss';

export class ContactUs extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.router = context.router;
        this.state = {
          infosProfile : User.getState()
        };
        this.onChange = this.onChange.bind(this);
        ContactAction.requestContactUs();
    }

    componentWillMount() {
        User.listen(this.onChange);
    }

    onChange() {
        var toto = Object.assign({}, this.state);
        toto.infosProfile = User.getState();
        console.log("Hello: ", toto.infosProfile)
        this.setState(toto);

    }

    render() {
      console.log("A ", this.state.infosProfile)
      console.log("B ", this.state.infosProfile.message)
      console.log("C ", this.state.infosProfile.message.prenom)
      console.log("D ", typeof this.state.infosProfile.message.prenom)
        return (
          <div className="center_div">
            <HomeMenu user={this.state.userConnected} />
              <div className="profil_mainInfo">
                <h1>Welcome, ContactUS {this.state.infosProfile.message.prenom}</h1>
              </div>
          </div>
        );
    }
}

ContactUs.propTypes = {
    user: React.PropTypes.shape({
        id: React.PropTypes.number.isRequired,
        name: React.PropTypes.string,
    }),
};
