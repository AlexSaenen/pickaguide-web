import React from 'react';

import { StoreObserver } from 'base/StoreObserver.jsx';
import { Layout } from 'base/Layout.jsx';
import { TextArea } from 'formFramework/TextArea.jsx';
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
      <div>
      <Layout>
        <Title>{`${profile.firstName}${profile.lastName.charAt(0).toUpperCase()}`}</Title>
        <div>
          <img src={profile.photoUrl} alt="Profile" />
          <p>Date of Birth : {profile.birthdate}</p>
          <p>Email : {profile.email}</p>
          <p>Phone : {profile.phone}</p>
          <p>City : {profile.city}</p>
        </div>

      </Layout>
      <Layout>
        <div>
          <p>{profile.description}</p>
        </div>
        <div>
          <p>{profile.interests}</p>
        </div>
      </Layout>
      </div>
    );
  }
}
