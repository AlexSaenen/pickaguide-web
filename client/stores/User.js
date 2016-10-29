import alt from '../alt';
import SigninActions from '../actions/Signin.js';
import LoginActions from '../actions/Login.js';
import SigninApi from '../services/Signin.js';
import LoginApi from '../services/Login.js';

class UserStore {
    constructor() {
        this.signin = null;
        this.login = null;
        this.error = null;

        this.bindActions(SigninActions);
        this.bindActions(LoginActions);
    }

    onRequestSignin(form) {
        SigninApi.getSignin(form);
    }

    onRequestSigninSuccess(signin) {
        this.error = null;
        this.signin = signin;
    }

    onRequestSigninError(error) {
        this.error = error;
    }

    onRequestLogin(form) {
        LoginApi.getLogin(form);
    }

    onRequestLoginSuccess(login) {
        this.error = null;
        this.login = login;
    }

    onRequestLoginError(error) {
        this.error = error;
    }
}

export default alt.createStore(UserStore, 'UserStore');
