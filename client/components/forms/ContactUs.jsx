import React from 'react';

import { HomeMenu } from '../menu/HomeMenu.jsx';
import { BasicForm } from '../formFramework/BasicForm.jsx';
import { TextArea } from '../formFramework/TextArea.jsx';
import { TextInput } from '../formFramework/TextInput.jsx';
import { TelInput } from '../formFramework/TelInput.jsx';
import { EmailInput } from '../formFramework/EmailInput.jsx';
import ContactActions from '../../actions/ContactUs.js';
import User from '../../stores/User.js';

import 'scss/components/_home.scss';

export class ContactUs extends React.Component {
  constructor(props, context) {
    super(props, context);

    // this.router = context.router;
    this.state = {
      infosProfile: User.getState(),
    };

    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    ContactActions.requestContactUs();
  }

  componentWillMount() {
    User.listen(this.onChange);
  }

  onChange() {
    const stateCopy = Object.assign({}, this.state);
    stateCopy.infosProfile = User.getState();
    console.log('Hello: ', stateCopy.infosProfile);
    this.setState(stateCopy);
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  render() {
    const profile = this.state.infosProfile;
    console.log('A ', profile);
    console.log('B ', profile.message);
    console.log('C ', profile.message.prenom);
    console.log('D ', typeof profile.message.prenom);

    // TODO: Alex: Insert a title for Contact Us, make sure to create the element for that

    return (
      <div>
        <HomeMenu user={this.state.userConnected} />
        <BasicForm onSubmit={this.handleSubmit} submitLabel="Contact">
          <TextInput
            label="name"
            value={
              this.state.userConnected ? `${profile.message.prenom} ${profile.message.nom}` : ''
            }
            placeholder="Nom complet"
            required
          />
          <EmailInput
            value={
              this.state.userConnected ? profile.message.email : ''
            }
            placeholder="Email"
            required
          />
          <TelInput label="phone" placeholder="Téléphone" />
          <TextArea label="message" placeholder="Entrez votre message" required />
        </BasicForm>
      </div>
    );
  }
}

// ContactUs.propTypes = {
//   user: React.PropTypes.shape({
//     id: React.PropTypes.number.isRequired,
//     name: React.PropTypes.string,
//   }),
// };
