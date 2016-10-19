import alt from '../alt';
import SigninActions from '../actions/Signin.js';
import SigninApi from '../services/Signin.js';

class SigninStore {
    constructor() {
        this.signin = null;
        this.error = null;

        this.bindActions(SigninActions);
    }

    onRequestSignin(form) {
        console.log('****', form)
        SigninApi.getSignin(form);
    }

    onRequestSigninSuccess(signin) {
        this.error = null;
        this.signin = signin;
    }

    onRequestSigninError(error) {
        this.error = error;
    }
}

export default alt.createStore(SigninStore, 'SigninStore');
