import LocationActions from 'actions/Location.js';
import AuthStore from 'stores/user/Auth.js';
import PromiseApi from 'services/PromiseApi.js';


export default class LocationApi {

  static sendLocation(coor) {
    const credentials = AuthStore.getState().credentials;
    if (credentials) {
      PromiseApi.auth().post('/profiles/geo', coor)
        .then((res) => {
          LocationActions.sendLocationSuccess(res);
        })
        .catch((err) => {
          LocationActions.error(err);
        });
    }
  }
  static nearGuide(range) {
    const credentials = AuthStore.getState().credentials;
    if (credentials) {
      PromiseApi.auth().get(`/profiles/geo/${range}`)
        .then((res) => {
          LocationActions.nearGuideSuccess(res);
        })
        .catch((err) => {
          LocationActions.error(err);
        });
    }
  }

  static nearAds(range) {
    const credentials = AuthStore.getState().credentials;
    if (credentials) {
      PromiseApi.auth().get(`/proposals/geo/${range}`)
        .then((res) => {
          console.log('res =>', res);
          LocationActions.nearAdsSuccess(res);
        })
        .catch((err) => {
          LocationActions.error(err);
        });
    }
  }

}
