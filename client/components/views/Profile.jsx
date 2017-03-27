import React from 'react';

import { StoreObserver } from 'base/StoreObserver.jsx';
import { PanelLayout } from 'view/PanelLayout.jsx';
import { CheckMark } from 'layout/elements/CheckMark.jsx';
import { SubTitle } from 'layout/elements/SubTitle.jsx';
import { Picture } from 'layout/elements/Picture.jsx';
import { Text } from 'layout/elements/Text.jsx';
import ProfileActions from 'actions/Profile.js';
import ProfileStore from 'stores/user/Profile.js';
import AccountStore from 'stores/user/Account.js';


export class Profile extends StoreObserver {

  constructor(props, context) {
    super(props, context, [ProfileStore, AccountStore]);

    this.state = {
      profile: ProfileStore.getState().profile,
      isConfirmed: AccountStore.getState().isConfirmed,
    };

    this.onStoreChange = this.onStoreChange.bind(this);
  }

  componentDidMount() {
    super.componentDidMount();
    ProfileActions.get();
  }

  onStoreChange(store) {
    const stateCopy = Object.assign({}, this.state);

    if (store.profile !== undefined) {
      stateCopy.profile = store.profile;
    } else {
      stateCopy.isConfirmed = store.isConfirmed;
    }

    this.updateState(stateCopy);
  }

  render() {
    const profile = this.state.profile || {};
    const birthDate = new Date(profile.birthdate);

    return (
      <PanelLayout layoutStyle="LayoutLight Tight">
        <div className="LayoutHeader">
          <div className="HeaderPicture Inline-Block"><Picture url={profile.photoUrl} pictureName="Profile" /></div>
          <p className="HeaderText Title Inline-Block" >{`${profile.firstName} ${profile.lastName}`}</p>
          <div className="HeaderCheckMark"><CheckMark active={this.state.isConfirmed} /></div>
        </div>

        <hr className="SpacedOverlay" />

        <SubTitle>Basic Info</SubTitle>
        <Text>
          <p><strong>Date of Birth:</strong> {birthDate.toDateString()}</p>
          <p><strong>City:</strong> {profile.city ? profile.city : 'None'}</p>
        </Text>

        <hr className="SpacedDivider" />

        <SubTitle>Description</SubTitle>
        <Text>{profile.description ? profile.description : 'None'}</Text>

        <hr className="SpacedDivider" />

        <SubTitle>Interests</SubTitle>
        <Text>{profile.interests.length > 0 ?
            profile.interests.map(interest => React.createElement('p', null, interest)) : 'None'}
        </Text>
      </PanelLayout>
    );
  }
}
