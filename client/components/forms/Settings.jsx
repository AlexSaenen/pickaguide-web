import React from 'react';

import { HomeMenu } from '../menu/HomeMenu.jsx';
import { BasicForm } from '../formFramework/BasicForm.jsx';
import { TextInput } from '../formFramework/TextInput.jsx';
import { PasswordInput } from '../formFramework/PasswordInput.jsx';
import { TelInput } from '../formFramework/TelInput.jsx';
import { EmailInput } from '../formFramework/EmailInput.jsx';
// import SettingsActions from '../../actions/Settings.js';
import User from '../../stores/User.js';

import 'scss/components/_home.scss';

export class Settings extends React.Component {
  constructor(props, context) {
    super(props, context);


    this.router = context.router;
    this.state = {
      infosProfile: {},
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    User.listen(this.handleSubmit);
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  // TODO: Alex: Insert a title for Settings, make sure to create the element for that

  render() {
    return (
      <div>
        <HomeMenu user={this.state.userConnected} />
        <BasicForm onSubmit={this.handleSubmit} submitLabel="Save">
          <TextInput label="prenom" placeholder="Entrez votre prénom" />
          <TextInput label="nom" placeholder="Entrez votre nom" />
          <EmailInput placeholder="Entrez votre email" />
          <PasswordInput placeholder="Entrez votre mot de passe" />
          <PasswordInput label="passwordConfirmation" placeholder="Confirmez votre mot de passe" />
          <TelInput label="phone" placeholder="Téléphone" />
          <TextInput label="city" placeholder="Ville" />
          <TextInput label="hobbies" placeholder="Hobbies" />
        </BasicForm>
      </div>
    );
  }
}

// Settings.propTypes = {
//   user: React.PropTypes.shape({
//     id: React.PropTypes.number.isRequired,
//     name: React.PropTypes.string,
//   }),
// };
