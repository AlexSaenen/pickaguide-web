import React from 'react';

import { PropsComponent } from 'base/PropsComponent.jsx';
import { PanelLayout } from 'view/PanelLayout.jsx';
import { CheckMark } from 'layout/elements/CheckMark.jsx';
import { SubTitle } from 'layout/elements/SubTitle.jsx';
import { Picture } from 'layout/elements/Picture.jsx';
import { Text } from 'layout/elements/Text.jsx';
import ProfileStore from 'stores/user/Profile.js';
import AccountStore from 'stores/user/Account.js';
// import SearchAccountStore from 'stores/search/Account.js';
// import SearchProfileStore from 'stores/search/Profile.js';
import AuthStore from 'stores/user/Auth.js';


export class Profile extends PropsComponent {

  constructor(props, context) {
    super(props, context);

    this.populateState = this.populateState.bind(this);
    this.populateState(props.params.id, this.state);
  }

  populateState(userId, nextState) {
    const userCredentials = AuthStore.getState().credentials;

    if (userCredentials && userCredentials.id === userId) {
      nextState.profile = ProfileStore.getState().profile;
      nextState.isConfirmed = AccountStore.getState().isConfirmed;
    } else {
      // const profileResults = SearchProfileStore.getState().results;
      // const accountResults = SearchAccountStore.getState().results;
      // nextState.profile = profileResults.find(result => result.id === userId).profile;
      // nextState.profile.interests = []; // TODO: Alex: find route, handler solution
      // nextState.isConfirmed = accountResults.find(result => result.id === userId).isConfirmed;
    }
  }

  componentWillReceiveProps(nextProps) {
    const stateCopy = Object.assign({}, this.state);
    this.populateState(nextProps.params.id, stateCopy);
    this.updateState(stateCopy);
  }

  render() {
    const profile = this.state.profile;
    const birthDate = new Date(profile.birthdate);

    const name = (profile.displayName ? profile.displayName : `${profile.firstName} ${profile.lastName}`);
    // TODO: Alex: Name should be displayName or pseudo

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
