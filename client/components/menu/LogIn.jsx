import React from 'react';

import { HomeMenu } from './HomeMenu.jsx';
import LogInActions from '../../actions/Login.js';
import LogInStore from '../../stores/User.js';

import 'scss/components/_home.scss';

export class LogIn extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            username: "",
            mdp:"",
            isSuccess: null,
            message: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
      e.preventDefault();
      LogInActions.requestLogin(this.state);
    }

    handleChange(e) {
       e.preventDefault();
       var stateCopy = Object.assign({}, this.state);
       stateCopy[e.target.name] = e.target.value;
       this.setState(stateCopy);
    }

    render() {
        return (
          <div>
            <HomeMenu user={this.state.userConnected} />
            <form onSubmit={this.handleSubmit}>
               <label>Entrez votre nom d'utilisateur</label> : <input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
               <br />
               <label>Entrez votre mot de passe</label> : <input type="text" name="mdp" value={this.state.mdp} onChange={this.handleChange} />
               <br />
               <input type="submit" value="Submit"/>
            </form>
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
