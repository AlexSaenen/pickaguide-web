import React from 'react';

import { HomeMenu } from '../menu/HomeMenu.jsx';
import { BasicForm } from '../formFramework/BasicForm.jsx';
import { TextInput } from '../formFramework/TextInput.jsx';
import { EmailInput } from '../formFramework/EmailInput.jsx';
import { PasswordInput } from '../formFramework/PasswordInput.jsx';
// import { browserHistory } from 'react-router';
import SignupActions from '../../actions/Signup.js';
import SignupStore from '../../stores/Signup.js';

export class Signup extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      isSuccess: null,
      messageTitle: '',
      messageContent: '',
      User: {},
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    SignupStore.listen(this.onChange);
  }

  onChange(store) {
    const stateCopy = Object.assign({}, this.state);

    stateCopy.isSuccess = !store.error;
    if (store.error) {
      stateCopy.messageTitle = 'Some error occurred when logging in';
      stateCopy.messageContent = String(store.error);
    } else {
      stateCopy.messageTitle = 'Info';
      stateCopy.messageContent = store.message;
    }

    this.setState(stateCopy);
  }

  handleSubmit(form) {
    SignupActions.requestSignup(form);
  }

  render() {
    console.log(JSON.stringify(this.state.User));
    if (this.state.User.code !== undefined) {
      // const goodClass = this.state.User.code === 200 ? 'alertMessageSucc' : 'alertMessageErr';
      // const alertMessage = <div className={goodClass}>{this.state.User.message}</div>;

      if (this.state.User.code === 200) {
        // setTimeout(() => {
        //   browserHistory.push('/profile');
        // }, 2000);
      }
    }

    const message = {
      title: this.state.messageTitle,
      content: this.state.messageContent,
      type: (this.state.isSuccess ? 'Success' : 'Alert'),
    };

    return (
      <div className="center_div">
        <HomeMenu user={this.state.userConnected} />
        <BasicForm onSubmit={this.handleSubmit} submitLabel="Signup" message={message}>
          <TextInput label={'firstName'} placeholder={'Entrez votre prénom'} required />
          <TextInput label={'lastName'} placeholder={'Entrez votre nom'} required />
          <EmailInput placeholder={'Entrez votre email'} required />
          <PasswordInput
            label={'password'}
            placeholder={'Entrez votre mot de passe'}
            required
          />
          <PasswordInput
            label={'passwordConfirmation'}
            placeholder={'Confirmez le mot de passe'}
            required
          />
        </BasicForm>
      </div>
    );
  }
}

Signup.propTypes = {
  user: React.PropTypes.shape({
    id: React.PropTypes.number.isRequired,
    name: React.PropTypes.string,
  }),
};

// SignIn.contextTypes = {
//     router: React.PropTypes.object.isRequired
// };
