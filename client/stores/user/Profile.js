import alt from 'client/alt';
import ProfileActions from 'actions/Profile.js';
import ProfileApi from 'services/Profile.js';


const formatProfile = (profile) => {
  const formattedProfile = profile;
  formattedProfile.pseudo = `${profile.firstName.substring(0, 6)}${profile.lastName.charAt(0)}`;
  let birthdate = formattedProfile.birthdate;

  if (birthdate) {
    birthdate = new Date(birthdate);
    let mm = birthdate.getMonth();
    if (mm < 10) { mm = `0${mm}`; }
    let dd = birthdate.getDate();
    if (dd < 10) { dd = `0${dd}`; }

    formattedProfile.birthdate = `${birthdate.getFullYear()}-${mm}-${dd}`;
  }

  return formattedProfile;
};

class ProfileStore {

  constructor() {
    this.error = null;
    this.profile = null;
    this.bindActions(ProfileActions);
  }

  onGet() {
    ProfileApi.get();
    return false;
  }

  onGetSuccess(profile) {
    this.error = null;
    this.profile = formatProfile(profile);
  }

  onError(error) {
    this.error = error;
  }

  onUpdate(form) {
    ProfileApi.update(form);
    return false;
  }

  onUpdateSuccess(user) {
    this.error = null;
    this.profile = formatProfile(user.profile);
  }

  onInvalidateProfile() {
    this.profile = null;
    this.error = null;
  }

}

export default alt.createStore(ProfileStore, 'ProfileStore');
