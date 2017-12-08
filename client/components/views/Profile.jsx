import React from 'react';

import { StoreObserver } from 'base/StoreObserver.jsx';
import { PanelLayout } from 'view/PanelLayout.jsx';
import { CheckMark } from 'layout/elements/CheckMark.jsx';
import { SubTitle } from 'layout/elements/SubTitle.jsx';
import { Picture } from 'layout/elements/Picture.jsx';
import { Text } from 'layout/elements/Text.jsx';
import { GuideAdvertsPreviews } from 'layout/user/GuideAdvertsPreviews.jsx';
import { strings } from './Profile_lang.js';
import SearchProfileStore from 'stores/other/Profile.js';
import SearchAvatarStore from 'stores/other/Avatar.js';
import SearchAccountStore from 'stores/other/Account.js';
import SearchUserStore from 'stores/other/User.js';
import ProfileActions from 'actions/SearchProfile.js';
import AccountActions from 'actions/SearchAccount.js';
import UserActions from 'actions/SearchUser.js';


const displayBirthdate = (birthdate) => {
  const monthMap = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];

  const splitDate = birthdate.split('-');
  return `${splitDate[2]} ${monthMap[Number(splitDate[1]) - 1]} ${splitDate[0]}`;
};


export class Profile extends StoreObserver {

  constructor(props, context, stores = []) {
    if (stores.constructor !== Array || stores.length === 0) {
      stores = [SearchProfileStore, SearchAvatarStore, SearchAccountStore, SearchUserStore];
    }

    super(props, context, stores);

    this.state = {
      profile: null,
      avatar: '',
      isConfirmed: false,
      isGuide: false,
    };

    this.isOwnerView = false;
    this.id = this.props.params.id;
  }

  componentDidMount() {
    super.componentDidMount();
    if (this.isOwnerView === false && this.state.profile === null) {
      ProfileActions.get.defer(this.id);
      AccountActions.isConfirmed.defer(this.id);
      UserActions.isGuide.defer(this.id);
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
    } else if (store.isConfirmed !== undefined) {
      nextState.isConfirmed = store.isConfirmed;
    } else {
      nextState.isGuide = store.isGuide;
    }

    this.setState(nextState);
  }

  render() {
    const profile = this.state.profile;

    if (profile === null) {
      return (<PanelLayout layoutStyle="LayoutLight Tight" />);
    }

    return (
      <div>
        <PanelLayout layoutStyle="LayoutLight Tight">
          <div className="LayoutHeader">
            <div className="HeaderPicture Inline-Block"><Picture url={this.state.avatar} pictureName="Profile" /></div>
            <p className="HeaderText Title Inline-Block" >{profile.displayName}</p>
            {
              profile.rate !== null && profile.rate !== undefined &&
                <div className="star-ratings-css Vertical">
                  <div className="star-ratings-css-top" style={{ width: `${profile.rate * 20}%` }}><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
                  <div className="star-ratings-css-bottom"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
                </div>
            }
          </div>

          <hr className="SpacedOverlay" />

          <SubTitle>{strings.stitleBasucInfo}</SubTitle>
          <Text>
            {
              this.isOwnerView ?
                <p><strong>{strings.outputBirthdate}:</strong> {displayBirthdate(profile.birthdate)}</p>
                :
                <p><strong>{strings.outputAge}:</strong> {(profile.age ? `${profile.age} ${strings.ageOld}` : strings.notIndicated) }</p>
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
        {
          this.state.isGuide &&
            <GuideAdvertsPreviews userId={this.id} />
        }
      </div>
    );
  }
}

Profile.propTypes = {
  params: React.PropTypes.object,
};
