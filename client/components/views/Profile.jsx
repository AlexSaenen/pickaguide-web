import React from 'react';

import { StateComponent } from 'base/StateComponent.jsx';
import { PanelLayout } from 'view/PanelLayout.jsx';
import { CheckMark } from 'layout/elements/CheckMark.jsx';
import { SubTitle } from 'layout/elements/SubTitle.jsx';
import { Picture } from 'layout/elements/Picture.jsx';
import { Text } from 'layout/elements/Text.jsx';
import SearchStore from 'stores/Search.js';


export class Profile extends StateComponent {

  constructor(props, context) {
    super(props, context);

    this.populateState = this.populateState.bind(this);
    this.id = this.props.params.id;
    this.populateState(this.state);
  }

  populateState(nextState) {
    const storeState = SearchStore.getState().results;

    if (storeState.ids !== undefined) {
      const profileIndex = storeState.ids.indexOf(this.id);

      if (profileIndex !== -1) {
        nextState.profile = storeState.profiles[profileIndex];
        nextState.isConfirmed = storeState.areConfirmed[profileIndex];
      }
    }
  }

  render() {
    const profile = this.state.profile;

    if (profile === undefined || profile === null) {
      return (
        <Text>No such profile found</Text>
      );
    }

    const birthDate = new Date(profile.birthdate);
    const name = profile.displayName;

    return (
      <PanelLayout layoutStyle="LayoutLight Tight">
        <div className="LayoutHeader">
          <div className="HeaderPicture Inline-Block"><Picture url={profile.photoUrl} pictureName="Profile" /></div>
          <p className="HeaderText Title Inline-Block" >{name}</p>
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
            profile.interests.map((interest, index) => React.createElement('p', { key: index }, interest)) : 'None'}
        </Text>
      </PanelLayout>
    );
  }
}

Profile.propTypes = {
  params: React.PropTypes.object,
};
