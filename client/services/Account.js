import AccountActions from 'actions/Account.js';
// import SearchAccountActions from 'actions/SearchAccount.js';
import PasswordActions from 'actions/Password.js';
import PromiseApi from 'services/PromiseApi.js';
import AuthStore from 'stores/user/Auth.js';

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

  // static search() {
  //   // for now getAll
  //   PromiseApi.get('/public/accounts/')
  //     .then((res) => {
  //       const accountIds = res.ids.join(',');
  //       PromiseApi.get(`/public/accounts/${accountIds}/areConfirmed`)
  //         .then((confirmedRes) => {
  //           const finalResults = res.accounts.map((account, index) => {
  //             const confirmedIndex = confirmedRes.ids.indexOf(res.ids[index]);
  //             return Object({
  //               id: res.ids[index],
  //               account: res.accounts[index],
  //               isConfirmed: confirmedRes.areConfirmed[confirmedIndex],
  //             });
  //           });
  //
  //           SearchAccountActions.searchSuccess.defer(finalResults);
  //         })
  //         .catch((err) => { SearchAccountActions.error.defer(err); });
  //     })
  //     .catch((err) => { SearchAccountActions.error.defer(err); });
  // }

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
          PasswordActions.error(res.error);
        } else {
          PasswordActions.updateSuccess(res);
        }
      })
      .catch((err) => {
        PasswordActions.error(err);
      });
  }

  static updateMail(form) {
    PromiseApi.auth().put('/accounts/mail', form)
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

  static isConfirmed(userId) {
    PromiseApi.get(`/public/accounts/${userId}/isConfirmed`)
      .then((res) => {
        if (res.error) {
          AccountActions.error(res.error);
        } else {
          AccountActions.isConfirmedSuccess(res.isConfirmed);
        }
      })
      .catch((err) => {
        AccountActions.error(err);
      });
  }

}
