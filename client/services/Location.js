import LocationActions from 'actions/Location.js';
import PromiseApi from 'services/PromiseApi.js';


export default class LocationApi {

  static sendLocation(coor) {
    PromiseApi.auth().post('/profiles/geo', coor)
      .then((res) => {
        LocationActions.sendLocationSuccess(res);
      })
      .catch((err) => {
        LocationActions.error(err);
      });
  }
  static nearGuide(range) {
    PromiseApi.auth().get('/profiles/geo?distance=' + range)
      .then((res) => {
        LocationActions.nearGuideSuccess(res);
      })
      .catch((err) => {
        LocationActions.error(err);
      });
  }
}
