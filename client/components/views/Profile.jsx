import React from 'react';

import { StateComponent } from 'base/StateComponent.jsx';
import { PanelLayout } from 'view/PanelLayout.jsx';
import { CheckMark } from 'layout/elements/CheckMark.jsx';
import { SubTitle } from 'layout/elements/SubTitle.jsx';
import { Picture } from 'layout/elements/Picture.jsx';
import { Text } from 'layout/elements/Text.jsx';
import { strings } from './Profile_lang.js';
import SearchStore from 'stores/Search.js';

const displayBirthdate = (birthdate) => {
  const monthMap = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];

  const splitDate = birthdate.split('-');
  return `${splitDate[2]} ${monthMap[Number(splitDate[1])]} ${splitDate[0]}`;
};


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
        nextState.avatar = storeState.avatars[profileIndex];
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

    const name = profile.displayName;

    return (
      <PanelLayout layoutStyle="LayoutLight Tight">
        <div className="LayoutHeader">
          <div className="HeaderPicture Inline-Block"><Picture url={this.state.avatar} pictureName="Profile" /></div>
          <p className="HeaderText Title Inline-Block" >{name}</p>
          <div className="HeaderCheckMark"><CheckMark active={this.state.isConfirmed} /></div>
        </div>

        <hr className="SpacedOverlay" />

        <SubTitle>{strings.stitleBasucInfo}</SubTitle>
        <Text>
          <p><strong>{strings.outputDateOfBirth}:</strong> {displayBirthdate(profile.birthdate)}</p>
          <p><strong>{strings.outputCity}:</strong> {profile.city ? profile.city : String(strings.outputNoCity)}</p>
        </Text>

        <hr className="SpacedDivider" />

        <SubTitle>{strings.stitleDescription}</SubTitle>
        <Text>{profile.description ? profile.description : String(strings.outputNoDescription)}</Text>

        <hr className="SpacedDivider" />

        <SubTitle>{strings.stitleInterests}</SubTitle>
        <Text>{profile.interests.length > 0 ?
            profile.interests.map((interest, index) => React.createElement('p', { key: index }, interest)) : String(strings.outputNoInterests)}
        </Text>
      </PanelLayout>
    );
  }
}

Profile.propTypes = {
  params: React.PropTypes.object,
};
