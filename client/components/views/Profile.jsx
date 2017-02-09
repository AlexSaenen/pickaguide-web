import React from 'react';

import { StoreObserver } from 'base/StoreObserver.jsx';
import { Layout } from 'base/Layout.jsx';
import { Title } from 'base/Title.jsx';
import ProfileActions from 'actions/Profile.js';
import ProfileStore from 'stores/Profile.js';


export class Profile extends StoreObserver {

  constructor(props, context) {
    super(props, context, ProfileStore);

    this.state = { profile: ProfileStore.getState().profile };
    this.onStoreChange = this.onStoreChange.bind(this);
  }

  componentDidMount() {
    super.componentDidMount();
    ProfileActions.get();
  }

  onStoreChange(store) {
    const stateCopy = Object.assign({}, this.state);
    stateCopy.profile = store.profile;
    this.updateState(stateCopy);
  }

  render() {
    const profile = this.state.profile || {};

    return (
      <Layout>
        <Title>Welcome home {`${profile.firstName} ${profile.lastName}`}, you will find here all your info</Title>
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
      </Layout>
    );
  }
}
