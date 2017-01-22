import React from 'react';

import ProfileActions from '../../actions/Profile.js';
import ProfileStore from '../../stores/Profile.js';
const _ = require('lodash');

export class Profile extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = { profile: ProfileStore.getState().profile };
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    ProfileStore.listen(this.onChange);
    ProfileActions.getProfile();
  }

  componentWillUnmount() {
    ProfileStore.unlisten(this.onChange);
  }

  onChange(store) {
    const stateCopy = Object.assign({}, this.state);
    stateCopy.profile = store.profile;
    if (_.isEqual(stateCopy, this.state) === false) {
      this.setState(stateCopy);
    }
  }

  render() {
    const profile = this.state.profile || {};

    return (
      <div>
        <div className="profil_mainInfo">
          <h1>Welcome home {`${profile.firstName} ${profile.lastName}`}, you will find here all your info</h1>
        </div>
        <div className="profil_baseInfoLeft">
          <img src={profile.photoUrl} alt="Profile" />
          <p>Date de naissance : {profile.birthdate}</p>
          <p>email : {profile.email}</p>
          <p>Téléphone : {profile.phone}</p>
          <p>Ville : {profile.city}</p>
        </div>
        <div className="profil_baseInfoCenter">
          <p>{profile.description}</p>
        </div>
        <div className="profil_baseInfoRight">
          <p>{profile.interests}</p>
        </div>
      </div>
    );
  }
}
