import alt from 'client/alt';
import ProfileActions from 'actions/Profile.js';
import AvatarActions from 'actions/Avatar.js';
import ProfileApi from 'services/Profile.js';


const formatProfile = (profile) => {
  const formattedProfile = profile;
  formattedProfile.pseudo = `${profile.firstName.substring(0, 6)}${profile.lastName.charAt(0)}`;

  if (formattedProfile.birthdate) {
    formattedProfile.birthdate = formattedProfile.birthdate.split('T')[0];
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
    AvatarActions.get.defer(profile.hasAvatar);
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
