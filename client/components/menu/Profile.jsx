import React from 'react';
import { browserHistory } from 'react-router'

import { HomeMenu } from './HomeMenu.jsx';
import ProfileActions from '../../actions/Profile.js';
import User from '../../stores/User.js';

import 'scss/components/_home.scss';

export class Profile extends React.Component {
    constructor(props, context) {
        super(props, context);


        this.router = context.router;
        this.state = {
          infosProfile : {}
        };
        this.onChange = this.onChange.bind(this);
    }

    componentWillMount() {
        User.listen(this.onChange);
    }

    onChange() {
        var toto = Object.assign({}, this.state);
        toto.infosProfile = User.getState().profile;
        this.setState(toto);
    }

    render() {
      console.log("PROFILE INFO:", this.state.infosProfile);
        return (
          <div className="center_div">
            <HomeMenu user={this.state.userConnected} />
              <div className="profil_mainInfo">
                <h1>Welcome home Sangoi Lucas, you will find here all your informations about your profil</h1>
              </div>
              <div className="profil_baseInfoLeft">
                <img src="https://cdn.local.epitech.eu/userprofil/profilview/lucas.sangoi.jpg" alt="Profile"/>
                <p>Date de naissance : 09 janvier 1908</p>
                <p>email : lucas.sangoi@epitech.eu</p>
                <p>Téléphone : 0670628885</p>
                <p>Ville : Canterbury</p>
              </div>
              <div className="profil_baseInfoCenter">
                <p>Salut, je m appelle Lucas, je viens de Toulouse, je suis actuellement en 4ème année à EPITECH, une école d informatique. Ce site fait parti d un projet de fin d étude dans le cadre de mon école, j espère que vous appricirez votre expérience sur notre site !</p>
              </div>
              <div className="profil_baseInfoRight">
              </div>
          </div>
        );
    }
}

Profile.propTypes = {
    user: React.PropTypes.shape({
        id: React.PropTypes.number.isRequired,
        name: React.PropTypes.string,
    }),
};
