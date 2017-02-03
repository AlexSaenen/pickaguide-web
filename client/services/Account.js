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
          AccountActions.getError.defer(err);
        });
    } else {
      AccountActions.getError.defer('Need to be logged in for that');
    }
  }

  static settings(form) {
    PromiseApi.auth().put('/accounts', form)
      .then((res) => {
        if (res.error) {
          AccountActions.settingsError(res.error);
        } else {
          AccountActions.settingsSuccess(res);
        }
      })
      .catch((err) => {
        AccountActions.settingsError(err);
      });
  }

}
