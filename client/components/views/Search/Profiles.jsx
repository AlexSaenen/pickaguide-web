import React from 'react';
import { browserHistory } from 'react-router';

import { PropsComponent } from 'base/PropsComponent.jsx';
import { Layout } from 'layout/containers/Layout.jsx';
import { List } from 'layout/list/List.jsx';
import { Element } from 'layout/list/Element.jsx';
import { ProfilePreview } from 'layout/user/ProfilePreview.jsx';

export class Profiles extends PropsComponent {

  constructor(props, context) {
    super(props, context);

    this.navigateToProfile = this.navigateToProfile.bind(this);
  }

  navigateToProfile(profileId) {
    if (this.props.ids !== undefined) {
      const profileIndex = this.props.ids.indexOf(profileId);
      if (profileIndex !== -1) {
        browserHistory.push(`/profiles/${profileId}`);
      }
    }
  }

  render() {
    return (
      <Element key={0} elementStyle="W30 Transparent NoWrap">
        <Element elementStyle="Tight WidthFullImportant NoWrap">
          <Layout layoutStyle="LayoutRegular SoftShadowNonHover">
            <p>We found these <strong>awesome guides</strong> for you !</p>
          </Layout>
        </Element>

        <List elementStyle="Tight Clickable WidthFullImportant Box NoHorizontalWrap" listStyle="WidthFull">
          {
            this.props.profiles.map((profile, index) => {
              if (profile.hide !== true) {
                return (
                  <ProfilePreview
                    {...profile}
                    avatar={this.props.avatars[index]}
                    _id={this.props.ids[index]}
                    isConfirmed={this.props.areConfirmed[index]}
                    key={index}
                    onClick={this.navigateToProfile}
                  />
                );
              }
              return null;
            })
          }
        </List>
      </Element>
    );
  }
}
