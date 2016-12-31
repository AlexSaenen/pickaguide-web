import React from 'react';

import { HomeMenu } from '../menu/HomeMenu.jsx';
import { BasicForm } from '../formFramework/BasicForm.jsx';
import { EmailInput } from '../formFramework/EmailInput.jsx';
import { PasswordInput } from '../formFramework/PasswordInput.jsx';
import LoginActions from '../../actions/Login.js';
import LoginStore from '../../stores/Login.js';

export class Login extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      isSuccess: null,
      messageTitle: '',
      messageContent: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    LoginStore.listen(this.onChange);
  }

  onChange(store) {
    const stateCopy = Object.assign({}, this.state);

    if (store.error) {
      stateCopy.messageTitle = 'Some error occurred when logging in';
      stateCopy.messageContent = store.error;
      stateCopy.isSuccess = false;
      this.setState(stateCopy);
    } else if (store.login) {
      stateCopy.messageTitle = 'Successful';
      stateCopy.messageContent = 'You have successfully logged in !';
      stateCopy.isSuccess = true;
      this.setState(stateCopy);
    }
  }

  handleSubmit(form) {
    LoginActions.requestLogin(form);
  }

  render() {
    const message = {
      title: this.state.messageTitle,
      content: this.state.messageContent,
      type: (this.state.isSuccess ? 'Success' : 'Alert'),
    };

    return (
      <div>
        <HomeMenu user={this.state.userConnected} />
        <BasicForm onSubmit={this.handleSubmit} submitLabel="Login" message={message}>
          <EmailInput ref="email" placeholder={'Email'} required />
          <PasswordInput ref="password" label={'password'} placeholder={'Password'} required />
        </BasicForm>
      </div>
    );
  }
}

// LogIn.propTypes = {
//     user: React.PropTypes.shape({
//         id: React.PropTypes.number.isRequired,
//         name: React.PropTypes.string,
//     }),
// };
