import React from 'react';

import { HomeMenu } from './HomeMenu.jsx';
import Signin from '../../actions/Signin.js';
import toto from '../../stores/User.js';

import 'scss/components/_home.scss';

export class SignIn extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            prenom: "",
            nom: "",
            mail: "",
            mdp:"",
            mdpVerif:"",
            isSuccess: null,
            message: ""
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

    var alertMessage = null;
    if (this.state.isSuccess != null) {
      alertMessage = isSuccess == true ? <div className="panel-alert alert-success" role="alert"> {this.state.message} </div> : <div className="panel-alert alert-danger" role="alert"> {this.state.message} </div>;
    }

        return (
          <div>
            <HomeMenu user={this.state.userConnected} />
            <form onSubmit={this.handleSubmit}>
               <label>Votre prénom</label> : <input type="text" name="prenom" value={this.state.prenom} placeholder="Entrez votre prénom" onChange={this.handleChange} />
               <br />
               <label>Votre nom</label> : <input type="text" name="nom" value={this.state.nom} placeholder="Entrez votre nom" onChange={this.handleChange} />
               <br />
               <label>Votre mail</label> : <input type="text" name="mail" value={this.state.mail} placeholder="Entrez votre mail" onChange={this.handleChange} />
               <br />
               <label>Votre mot de passe</label> : <input type="password" name="mdp" value={this.state.mdp} placeholder="Entrez votre mot de passe" onChange={this.handleChange} />
               <br />
               <label>Confirmation</label> : <input type="password" name="mdpVerif" value={this.state.mdpVerif} placeholder="Confirmation" onChange={this.handleChange} />
               <br />
               <input type="submit" value="Submit"/>
            </form>
            {alertMessage}
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
