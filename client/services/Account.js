import AccountActions from 'actions/Account.js';
import PromiseApi from 'services/PromiseApi.js';


export default class AccountApi {

  static get() {
    PromiseApi.auth().get('/account')
      .then((res) => {
        if (res.error) {
          AccountActions.getError(res.error);
        } else {
          AccountActions.getSuccess(res);
        }
      })
      .catch((err) => {
        AccountActions.getError(err);
      });
  }
}
