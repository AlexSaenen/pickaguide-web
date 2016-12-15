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
            <h1>ContactUS</h1>
          </div>
          <br/><br/>
          <form id='contactus' action='' method='post' accept-charset='UTF-8'>
            <div>* champ requis</div>
            <br/>
            {this.state.userConnected ? (
              <div>
                <label>Nom complet *: </label><br/>
                <input type='text' name='name' id='name' value={this.state.infosProfile.message.prenom + ' ' + this.state.infosProfile.message.nom}/><br/>
              </div>
            ):(
              <div>
                <label>Nom complet *: </label><br/>
                <input type='text' name='name' id='name' maxlength="50" placeholder="Entrez votre nom" required/><br/>
              </div>
            )}
            {this.state.userConnected ? (
            <div>
                <label>Adresse Email *:</label><br/>
                <input type='email' name='email' id='email' value={this.state.infosProfile.message.email}/><br/>
            </div>
            ):(
              <div>
                <label>Adresse Email *:</label><br/>
                <input type='email' name='email' id='email' maxlength="50" placeholder="Entrez un email" required/><br/>
              </div>
            )}
            <div>
                <label>Numero de téléphone:</label><br/>
                <input type='tel' name='phone' id='phone' maxlength="50" placeholder="Entrez un numero de téléphone" pattern="^(?:0|\(?\+33\)?\s?|0033\s?)[1-79](?:[\.\-\s]?\d\d){4}$" /><br/>
            </div>

            <div>
                <label>Message :</label><br/>
                <textarea rows="10" cols="50" name='message' id='message' placeholder="Entrez votre message" required></textarea>
            </div>

            <div>
                <input type='submit' name='Submit' value='Submit' />
            </div>  
          </form>
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
