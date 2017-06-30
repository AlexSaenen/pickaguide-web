import React from 'react';

import { StoreObserver } from 'base/StoreObserver.jsx';
import { PanelLayout } from 'view/PanelLayout.jsx';
import { CheckMark } from 'layout/elements/CheckMark.jsx';
import { SubTitle } from 'layout/elements/SubTitle.jsx';
import { Picture } from 'layout/elements/Picture.jsx';
import { Text } from 'layout/elements/Text.jsx';
import { strings } from './Profile_lang.js';
import SearchProfileStore from 'stores/other/Profile.js';
import SearchAvatarStore from 'stores/other/Avatar.js';
import SearchAccountStore from 'stores/other/Account.js';
import ProfileActions from 'actions/SearchProfile.js';
import AccountActions from 'actions/SearchAccount.js';

const displayBirthdate = (birthdate) => {
  const monthMap = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];

  const splitDate = birthdate.split('-');
  return `${splitDate[2]} ${monthMap[Number(splitDate[1])]} ${splitDate[0]}`;
};


export class Profile extends StoreObserver {

  constructor(props, context, stores = []) {
    if (stores.constructor !== Array || stores.length === 0) {
      stores = [SearchProfileStore, SearchAvatarStore, SearchAccountStore];
    }

    super(props, context, stores);

    this.state = {
      profile: null,
      avatar: SearchAvatarStore.getState().avatar,
      isConfirmed: false,
    };

    this.isOwnerView = false;
    this.id = this.props.params.id;
  }

  componentDidMount() {
    super.componentDidMount();
    if (this.isOwnerView === false && this.state.profile === null) {
      ProfileActions.get(this.id);
      AccountActions.isConfirmed(this.id);
    }
  }

  onStore(store) {
    const nextState = Object.assign({}, this.state);

    if (store.error) {
      return;
    } else if (store.profile) {
      nextState.profile = store.profile;

      if (this.isOwnerView) {
        nextState.profile.displayName = `${store.profile.firstName} ${store.profile.lastName}`;
      }
    } else if (store.avatar) {
      nextState.avatar = store.avatar;
    } else {
      nextState.isConfirmed = store.isConfirmed;
    }

    this.setState(nextState);
  }

  render() {
    const profile = this.state.profile;

    if (profile === null) {
      return (<PanelLayout layoutStyle="LayoutLight Tight" />);
    }

    return (
      <PanelLayout layoutStyle="LayoutLight Tight">
        <div className="LayoutHeader">
          <div className="HeaderPicture Inline-Block"><Picture url={this.state.avatar} pictureName="Profile" /></div>
          <p className="HeaderText Title Inline-Block" >{profile.displayName}</p>
          <div className="HeaderCheckMark"><CheckMark active={this.state.isConfirmed} /></div>
        </div>

        <hr className="SpacedOverlay" />

        <SubTitle>{strings.stitleBasucInfo}</SubTitle>
        <Text>
          {
            this.isOwnerView ?
              <p><strong>{strings.outputBirthdate}:</strong> {displayBirthdate(profile.birthdate)}</p>
              :
              <p><strong>{strings.outputAge}:</strong> {profile.age} {strings.ageOld}</p>
          }
          <p><strong>{strings.outputCity}:</strong> {profile.city ? profile.city : String(strings.outputNoCity)}</p>
          <p><strong>{strings.outputCountry}:</strong> {profile.country ? profile.country : String(strings.outputNoCountry)}</p>
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
