import SettingsActions from 'actions/Settings.js';
import PromiseApi from 'services/PromiseApi.js';


export default class SettingsApi {

  static update(form) {
    PromiseApi.auth().put('/settings', form)
      .then((res) => {
        if (res.error) {
          SettingsActions.error(res.error);
        } else {
          SettingsActions.updateSuccess(res);
        }
      })
      .catch((err) => {
        SettingsActions.error(err);
      });
  }
}
