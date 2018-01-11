import SearchActions from 'actions/Search.js';
import ProfileActions from 'actions/SearchProfile.js';
import AccountActions from 'actions/SearchAccount.js';
import PromiseApi from 'services/PromiseApi.js';
import AvatarApi from 'services/Avatar.js';


export default class SearchApi {

  static search(term) {
    let searchResults = {};

    PromiseApi.get(`/public/search/filter/${encodeURIComponent(term)}`)
      .then((res) => {
        searchResults = res;
        return AvatarApi.getAvatars(res.ids, res.profiles.map(profile => profile.hasAvatar));
      })
      .then((avatars) => {
        searchResults.avatars = avatars;
      })
      .then(() => {
        Promise.all(searchResults.adverts.map((advert) => {
          if (advert.photoUrl === '') {
            return PromiseApi.download(`/public/proposals/${advert._id}/image`);
          }

          return advert.photoUrl;
        }))
        .then((images) => {
          images.forEach((image, index) => {
            searchResults.adverts[index].images = [image];
          });

          SearchActions.searchSuccess.defer(searchResults);
        });
      })
      .catch(err => SearchActions.error(err));
  }

  static findProfile(id) {
    PromiseApi.get(`/public/profiles/${id}`)
      .then((res) => {
        ProfileActions.getSuccess.defer(res);
      })
      .catch((err) => {
        ProfileActions.error.defer(err);
      });
  }

  static isConfirmed(id) {
    PromiseApi.get(`/public/accounts/${id}/isConfirmed`)
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

  static getAccount(id) {
    PromiseApi.get(`/accounts/${id}`)
      .then((res) => {
        AccountActions.getSuccess.defer(res);
      })
      .catch((err) => {
        AccountActions.error.defer(err);
      });
  }

}
