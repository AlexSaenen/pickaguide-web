import ProfileActions from 'actions/Profile.js';
// import SearchProfileActions from 'actions/SearchProfile.js';
import PromiseApi from 'services/PromiseApi.js';
import AuthStore from 'stores/user/Auth.js';


export default class ProfileApi {

  static get() {
    const credentials = AuthStore.getState().credentials;

    if (credentials) {
      PromiseApi.auth().get(`/profiles/${credentials.id}`)
        .then((res) => {
          ProfileActions.getSuccess.defer(res);
        })
        .catch((err) => {
          ProfileActions.error.defer(err);
        });
    } else {
      ProfileActions.error.defer('Need to be logged in for that');
    }
  }

  static update(form) {
    PromiseApi.auth().put('/profiles', form)
      .then((res) => {
        if (res.error) {
          ProfileActions.error(res.error);
        } else {
          ProfileActions.updateSuccess(res);
        }
      })
      .catch((err) => {
        ProfileActions.error(err);
      });
  }

  // static search() {
  //   // FIXME: Alex: for now getAll
  //   PromiseApi.get('/public/profiles/')
  //     .then((res) => {
  //       const finalResults = res.ids.map((id, index) => {
  //         return {
  //           id,
  //           profile: res.profiles[index],
  //         };
  //       });
  //
  //       SearchProfileActions.searchSuccess.defer(finalResults);
  //     })
  //     .catch((err) => { SearchProfileActions.error.defer(err); });
  // }

}
