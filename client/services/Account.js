import AccountActions from 'actions/Account.js';
import PromiseApi from 'services/PromiseApi.js';
import AuthStore from 'stores/Auth.js';

export default class AccountApi {

  static get() {
    const credentials = AuthStore.getState().credentials;
    if (credentials) {
      PromiseApi.auth().get(`/accounts/${credentials.id}`)
        .then((res) => {
          AccountActions.getSuccess.defer(res);
        })
        .catch((err) => {
          AccountActions.error.defer(err);
        });
    } else {
      AccountActions.error.defer('Need to be logged in for that');
    }
  }

  static update(form) {
    PromiseApi.auth().put('/accounts', form)
      .then((res) => {
        if (res.error) {
          AccountActions.error(res.error);
        } else {
          AccountActions.updateSuccess(res);
        }
      })
      .catch((err) => {
        AccountActions.error(err);
      });
  }

  static updatePassword(form) {
    PromiseApi.auth().put('/accounts/password', form)
      .then((res) => {
        if (res.error) {
          AccountActions.updatePasswordError(res.error);
        } else {
          AccountActions.updatePasswordSuccess(res);
        }
      })
      .catch((err) => {
        AccountActions.updatePasswordError(err);
      });
  }

  static updateMail(form) {
    PromiseApi.auth().put('/accounts/mail', form)
      .then((res) => {
        if (res.error) {
          AccountActions.updateMailError(res.error);
        } else {
          AccountActions.updateMailSuccess(res);
        }
      })
      .catch((err) => {
        AccountActions.updateMailError(err);
      });
  }
}
