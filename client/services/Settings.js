import SettingsActions from 'actions/Settings.js';
import PromiseApi from 'services/PromiseApi.js';


export default class ProfileApi {

  static settings(form) {
    PromiseApi.auth().put('/settings', form)
    .then((res) => {
        if (res.error) {
            SettingsActions.onSettingsError(res.error);
            return;
        }
        SettingsActions.onSettingsSuccess(res);
    })
    .catch((err) => {
        SettingsActions.onSettingsError(err);
    });
  }
}
