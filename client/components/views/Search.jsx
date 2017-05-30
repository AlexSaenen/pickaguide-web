import React from 'react';
import { browserHistory } from 'react-router';

import { StoreObserver } from 'base/StoreObserver.jsx';
import { FormController } from 'base/FormController.jsx';
import SearchActions from 'actions/Search.js';
import SearchStore from 'stores/Search.js';
import { InlineForm } from 'form/InlineForm.jsx';
import { TextInput } from 'form/TextInput.jsx';
import { Layout } from 'layout/containers/Layout.jsx';
import { Message } from 'layout/elements/Message.jsx';
import { Information } from 'layout/elements/Information.jsx';
import { PanelList } from 'view/PanelList.jsx';
import { ProfilePreview } from 'layout/user/ProfilePreview.jsx';
import { AdvertPreview } from 'layout/user/AdvertPreview.jsx';
import AdvertsActions from 'actions/Adverts.js';


export class Search extends StoreObserver {

  constructor(props, context) {
    super(props, context, SearchStore);

    this.state = {
      results: SearchStore.getState().results,
      error: null,
      searchTerms: props.params.terms === 'none' ? '' : props.params.terms,
    };

    this.ctrl = new FormController();
    this.ctrl.attachSubmit(SearchActions.search);
    this.navigateToAdvert = this.navigateToAdvert.bind(this);
    this.navigateToProfile = this.navigateToProfile.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const newState = Object.assign({}, this.state);
    newState.searchTerms = nextProps.params.terms === 'none' ? '' : nextProps.params.terms;
    newState.error = null;
    this.updateState(newState);
  }

  onStore(store) {
    const newState = Object.assign({}, this.state);

    if (store.error) {
      newState.error = store.error;
    } else {
      newState.results = store.results;
      newState.error = null;
    }

    this.updateState(newState);
  }

  navigateToAdvert(advertId) {
    AdvertsActions.find(advertId);
    browserHistory.push(`/guide/adverts/${advertId}`);
  }

  navigateToProfile(profileId) {
    if (this.state.results !== undefined) {
      const profileIndex = this.state.results.ids.indexOf(profileId);
      if (profileIndex !== -1) {
        browserHistory.push(`/profiles/${profileId}`);
      }
    }
  }

  render() {
    const results = this.state.results;
    const profiles = results.profiles || [];
    const avatars = results.avatars || [];
    const ids = results.ids || [];
    const areConfirmed = results.areConfirmed || [];
    const adverts = results.adverts || [];

    if (this.state.error) {
      const message = {
        title: 'Something unusual happened',
        content: String(this.state.error),
        type: 'Alert',
      };

      return (
        <Layout layoutStyle="LayoutBlank">
          <Message messageStyle="Medium" {...message} timed={false} />
        </Layout>
      );
    }

    if (profiles.length === 0 && adverts.length === 0) {
      return (
        <div>
          <Layout layoutStyle="LayoutBlank">
            <InlineForm onSubmit={this.ctrl.submit} submitLabel="Search">
              <TextInput className="FormElement" placeholder="Search anything" value={this.state.searchTerms} inline />
            </InlineForm>

            {
              this.state.searchTerms !== '' &&
                <Information infoStyle="Info Small MarginAuto LineSpaced">No such results found :(</Information>
            }
          </Layout>
        </div>
      );
    }

    return (
      <div>
        <Layout layoutStyle="LayoutBlank">
          <InlineForm onSubmit={this.ctrl.submit} submitLabel="Search">
            <TextInput className="FormElement" placeholder="Search anything" value={this.state.searchTerms} inline />
          </InlineForm>
        </Layout>

        {
          profiles.length > 0 &&
            <PanelList panelStyle="Wide LessSpaced" elementStyle="Tight Clickable">
              {
                profiles.map((profile, index) => {
                  return (
                    <ProfilePreview
                      {...profile}
                      avatar={avatars[index]}
                      _id={ids[index]}
                      isConfirmed={areConfirmed[index]}
                      key={index}
                      onClick={this.navigateToProfile}
                    />
                  );
                })
              }
            </PanelList>
        }
        {
          adverts.length > 0 &&
            <PanelList panelStyle="Wide" elementStyle="Tight Clickable">
              {
                adverts.map((advert, index) => {
                  return (
                    <AdvertPreview
                      {...advert}
                      key={index}
                      onClick={this.navigateToAdvert}
                    />
                  );
                })
              }
            </PanelList>
        }
      </div>
    );
  }
}
