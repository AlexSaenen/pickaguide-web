import React from 'react';

import { StoreObserver } from 'base/StoreObserver.jsx';
import { Layout } from 'layout/Layout.jsx';
import { Title } from 'layout/Title.jsx';
import { Picture } from 'layout/Picture.jsx';
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
      <Layout layoutStyle="LayoutLight">
        <Title>{`${profile.firstName} ${profile.lastName}`}</Title>
        <div>
          <Picture pictureName="Profile" url={profile.photoUrl} />
          <p>Date of Birth : {profile.birthdate}</p>
          <p>Email : {profile.email}</p>
          <p>Phone : {profile.phone}</p>
          <p>City : {profile.city}</p>
        </div>
        <div>
          <p>{profile.description}</p>
        </div>
        <div>
          <p>{profile.interests}</p>
        </div>
      </Layout>
    );
  }
}
