import AccountActions from 'actions/Account.js';
import PromiseApi from 'services/PromiseApi.js';


export default class AccountApi {

  static get() {
    PromiseApi.auth().get('/account')
      .then((result) => {
        if (result.error) {
          AccountActions.getError(result.error);
        } else {
          AccountActions.getSuccess(result);
        }
      })
      .catch((err) => {
        AccountActions.getError(err);
      });
  }
}
