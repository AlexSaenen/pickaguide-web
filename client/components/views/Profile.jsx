import React from 'react';
import { browserHistory } from 'react-router';

import { StoreObserver } from 'base/StoreObserver.jsx';
import { Layout } from 'layout/containers/Layout.jsx';
import { List } from 'layout/list/List.jsx';
import { Element } from 'layout/list/Element.jsx';
import { Button } from 'layout/elements/Button.jsx';
import { Title } from 'layout/elements/Title.jsx';
import { Loader } from 'layout/elements/Loader.jsx';
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
    this.goToEditPage = this.goToEditPage.bind(this);
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

  goToEditPage() {
    browserHistory.push('/profiles/mine/edit');
  }

  render() {
    const profile = this.state.profile;

    if (profile === null) {
      return (<Loader />);
    }

    return (
      <div>
        <Layout layoutStyle="LayoutBlank">
          <div className="LayoutHeader">
            <div className="HeaderPicture Inline-Block"><Picture url={this.state.avatar} pictureName="Profile" radius /></div>
            <p className="HeaderText Title Inline-Block" >{profile.displayName}</p>
            {
              !!profile.rate &&
                <div className="star-ratings-css Vertical Margin">
                  <div className="star-ratings-css-top" style={{ width: `${profile.rate * 20}%` }}><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
                  <div className="star-ratings-css-bottom"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
                </div>
            }
          </div>
          {
            this.isOwnerView &&
              <Button label="Edit" buttonStyle="Blue Auto" onCallback={this.goToEditPage} />
          }
        </Layout>

        <Layout>
          <hr className="Overlay" />

          <List listStyle="ListGrid" wrapChildren={false}>
            <Element elementStyle="W40 Transparent Top Box NoWrap">
              <Layout layoutStyle="LayoutBlank NoWrap">
                <Layout layoutStyle="LayoutBlank SoftShadowNonHover MarginEight MarginTopFour">
                  <Title smaller>{strings.stitleBasucInfo}</Title>
                  <br />
                  <Text>
                    {
                      this.isOwnerView ?
                        <p><strong>{strings.outputBirthdate}:</strong> {displayBirthdate(profile.birthdate)}</p>
                      :
                        <p><strong>{strings.outputAge}:</strong> {(profile.age ? `${profile.age} ${strings.ageOld}` : strings.notIndicated)}</p>
                    }
                    <p><strong>{strings.outputCity}:</strong> {profile.city ? profile.city : String(strings.outputNoCity)}</p>
                    <p><strong>{strings.outputCountry}:</strong> {profile.country ? profile.country : String(strings.outputNoCountry)}</p>
                  </Text>
                </Layout>

                <Layout layoutStyle="LayoutBlank SoftShadowNonHover MarginEight">
                  <Title smaller>{strings.stitleDescription}</Title>
                  <br />
                  <Text>{profile.description ? profile.description : String(strings.outputNoDescription)}</Text>
                </Layout>

                <Layout layoutStyle="LayoutBlank SoftShadowNonHover MarginEight">
                  <Title smaller>{strings.stitleInterests}</Title>
                  <br />
                  <Text>{profile.interests.length > 0 ?
                    profile.interests.map((interest, index) => React.createElement('p', { key: index }, interest)) : String(strings.outputNoInterests)}
                  </Text>
                </Layout>
              </Layout>
            </Element>

            {
              this.state.isGuide &&
                <GuideAdvertsPreviews userId={this.id} />
            }
          </List>
        </Layout>
      </div>
    );
  }
}

Profile.propTypes = {
  params: React.PropTypes.object,
};
