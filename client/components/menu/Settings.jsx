import React from 'react';

import { HomeMenu } from './HomeMenu.jsx';
import SettingsActions from '../../actions/Settings.js';
import User from '../../stores/User.js';

import 'scss/components/_home.scss';

export class Settings extends React.Component {
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

    // handleChange(e) {
    //    e.preventDefault();
    //    var toto = Object.assign({}, this.state);
    //    toto[e.target.name] = e.target.value;
    //    this.setState(toto);
    // }


    render() {

        return (
          <div className="center_div">
            <HomeMenu user={this.state.userConnected} />
            <h1>Here you can add and change your personal informations</h1>
            <form onSubmit={this.handleSubmit}>
              <label>Votre pseudo</label> : <input type='text' name='pseudo' value={this.state.pseudo} placeholder='Entrez votre pseudo' onChange={this.handleChange} />
              <br />
              <label>Votre prénom</label> : <input type='text' name='prenom' value={this.state.prenom} placeholder='Entrez votre prénom' onChange={this.handleChange} />
              <br />
               <label>Votre nom</label> : <input type='text' name='nom' value={this.state.nom} placeholder='Entrez votre nom' onChange={this.handleChange} />
               <br />
               <label>Votre mail</label> : <input type='text' name='email' value={this.state.email} placeholder='Entrez votre mail' onChange={this.handleChange} />
               <br />
               <label>Votre mot de passe</label> : <input type='password' name='password' value={this.state.password} placeholder='Entrez votre mot de passe' onChange={this.handleChange} />
               <br />
               <label>Confirmation</label> : <input type='password' name='passwordConfirmation' value={this.state.passwordConfirmation} placeholder='Confirmation' onChange={this.handleChange} />
               <br />
               <label>Phone</label> : <input type='text' name='phone' value={this.state.phone} placeholder='phone' onChange={this.handleChange} />
               <br />
               <label>City</label> : <input type='text' name='city' value={this.state.city} placeholder='city' onChange={this.handleChange} />
               <br />
               <label>Hobbies</label> : <input type='text' name='hobbies' value={this.state.hobbies} placeholder='hobbies' onChange={this.handleChange} />
               <br />
               <input type='submit' value='Modifiez mes infos'/>
            </form>
          </div>
        );
    }
}

Settings.propTypes = {
    user: React.PropTypes.shape({
        id: React.PropTypes.number.isRequired,
        name: React.PropTypes.string,
    }),
};
