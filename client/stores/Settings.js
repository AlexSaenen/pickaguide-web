import alt from 'client/alt';
import SettingsActions from 'actions/Settings.js';
import SettingsApi from 'services/Settings.js';


class SignupStore {

  constructor() {
    this.error = null;
    this.settings = null;
    this.bindActions(SettingsActions);
  }

  onUpdate(form) {
    console.log('here', form);
    SettingsApi.settings(form);
  }

  onUpdateSuccess(settings) {
    this.error = null;
    this.settings = settings;
  }

  onError(error) {
    this.error = error;
  }
}

export default alt.createStore(SignupStore, 'SettingsStore');
