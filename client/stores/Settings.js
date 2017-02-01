import alt from 'client/alt';
import SettingsActions from 'actions/Settings.js';
import SettingsApi from 'services/Settings.js';


class SignupStore {

  constructor() {
    this.error = null;
    this.settings = '';
    this.bindActions(SettingsActions);
  }

  _handleError(error) {
    this.error = error;
    this.settings = '';
  }

  onSettings(form) {
    console.log('here', form);
    SettingsApi.settings(form);
  }

  onSettingsSuccess(settings) {
    this.error = null;
    this.settings = settings;
  }

  onSettingsError(error) {
    this.error = error;
  }
}

export default alt.createStore(SignupStore, 'SettingsStore');
