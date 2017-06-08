import React from 'react';

import { StateComponent } from 'base/StateComponent.jsx';
import { PanelLayout } from 'view/PanelLayout.jsx';
import { CheckMark } from 'layout/elements/CheckMark.jsx';
import { SubTitle } from 'layout/elements/SubTitle.jsx';
import { Picture } from 'layout/elements/Picture.jsx';
import { Text } from 'layout/elements/Text.jsx';
import ProfileStore from 'stores/user/Profile.js';
import AvatarStore from 'stores/user/Avatar.js';
import AccountStore from 'stores/user/Account.js';
import AuthStore from 'stores/user/Auth.js';

const displayBirthdate = (birthdate) => {
  const monthMap = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];

  const splitDate = birthdate.split('-');
  return `${splitDate[2]} ${monthMap[Number(splitDate[1])]} ${splitDate[0]}`;
};


export class OwnerProfile extends StateComponent {

  constructor(props, context) {
    super(props, context);

    this.populateState = this.populateState.bind(this);
    this.populateState(this.state);
  }

  populateState(nextState) {
    const userCredentials = AuthStore.getState().credentials;

    if (userCredentials) {
      nextState.profile = ProfileStore.getState().profile;
      nextState.avatar = AvatarStore.getState().avatar;
      nextState.isConfirmed = AccountStore.getState().isConfirmed;
    } else {
      nextState.profile = undefined;
      nextState.avatar = AvatarStore.getState().avatar;
      nextState.isConfirmed = false;
    }
  }

  render() {
    const profile = this.state.profile;

    if (profile === undefined || profile === null) {
      return (
        <Text>No such profile found</Text>
      );
    }

    const name = `${profile.firstName} ${profile.lastName}`;

    return (
      <PanelLayout layoutStyle="LayoutLight Tight">
        <div className="LayoutHeader">
          <div className="HeaderPicture Inline-Block"><Picture url={this.state.avatar} pictureName="Profile" /></div>
          <p className="HeaderText Title Inline-Block" >{name}</p>
          <div className="HeaderCheckMark"><CheckMark active={this.state.isConfirmed} /></div>
        </div>

        <hr className="SpacedOverlay" />

        <SubTitle>Basic Info</SubTitle>
        <Text>
          <p><strong>Date of Birth:</strong> {displayBirthdate(profile.birthdate)}</p>
          <p><strong>City:</strong> {profile.city ? profile.city : 'None'}</p>
        </Text>

        <hr className="SpacedDivider" />

        <SubTitle>Description</SubTitle>
        <Text>{profile.description ? profile.description : 'None'}</Text>

        <hr className="SpacedDivider" />

        <SubTitle>Interests</SubTitle>
        <Text>{profile.interests.length > 0 ?
            profile.interests.map((interest, index) => React.createElement('p', { key: index }, interest)) : 'None'}
        </Text>
      </PanelLayout>
    );
  }
}

OwnerProfile.propTypes = {
  params: React.PropTypes.object,
};
