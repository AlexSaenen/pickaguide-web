import React from 'react';

import { HomeMenu } from './HomeMenu.jsx';
import Signin from '../../actions/Signin.js';
import toto from '../../stores/User.js';

import 'scss/components/_home.scss';

export class SignIn extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            userConnected: props.user,
            prenom: "",
            nom: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
      e.preventDefault();
      console.log('-', this.state);
      Signin.requestSignin(this.state);
    }

    handleChange(e) {
       e.preventDefault();
       var toto = Object.assign({}, this.state);
       toto[e.target.name] = e.target.value;
       this.setState(toto);
    }

    render() {
        return (
          <div>
            <HomeMenu user={this.state.userConnected} />
            <form onSubmit={this.handleSubmit}>
               <label>Votre prénom</label> : <input type="text" name="prenom" value={this.state.prenom} placeholder="Prénom" onChange={this.handleChange} />
               <br />
               <label>Votre nom</label> : <input type="text" name="nom" value={this.state.nom} placeholder="Nom" onChange={this.handleChange} />
               <input type="submit" value="Submit"/>
            </form>
          </div>
        );
    }
}

SignIn.propTypes = {
    user: React.PropTypes.shape({
        id: React.PropTypes.number.isRequired,
        name: React.PropTypes.string,
    }),
};
