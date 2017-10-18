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
import { List } from 'layout/list/List.jsx';
import { Element } from 'layout/list/Element.jsx';
import { ProfilePreview } from 'layout/user/ProfilePreview.jsx';
import { AdvertPreview } from 'layout/user/AdvertPreview.jsx';
import { Loader } from 'layout/elements/Loader.jsx';
import { strings } from './Search_lang.js';

export class Search extends StoreObserver {

  constructor(props, context) {
    super(props, context, SearchStore);

    this.state = {
      results: null,
      error: null,
      searchTerms: props.params.terms.trim(),
    };

    this.ctrl = new FormController();
    this.ctrl.attachSubmit((form) => {
      if (form.terms && form.terms.trim().length > 0) {
        browserHistory.push(`/search/${encodeURIComponent(form.terms.trim())}`);
      }
    });

    this.navigateToAdvert = this.navigateToAdvert.bind(this);
    this.navigateToProfile = this.navigateToProfile.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const newState = Object.assign({}, this.state);
    newState.searchTerms = nextProps.params.terms.trim();
    newState.results = null;
    newState.error = null;
    this.setState(newState);

    if (newState.searchTerms !== '') {
      SearchActions.search({ terms: newState.searchTerms });
    }
  }

  componentDidMount() {
    super.componentDidMount();
    if (this.state.results === null && this.state.searchTerms !== '') {
      SearchActions.search({ terms: this.state.searchTerms });
    }
  }

  onStore(store) {
    const newState = Object.assign({}, this.state);

    if (store.error) {
      newState.error = store.error;
    } else {
      newState.results = store.results;
      newState.error = null;
    }

    this.setState(newState);
  }

  navigateToAdvert(advertId) {
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
    let profiles, avatars, ids, areConfirmed, adverts;

    if (results) {
      profiles = results.profiles || [];
      avatars = results.avatars || [];
      ids = results.ids || [];
      areConfirmed = results.areConfirmed || [];
      adverts = results.adverts || [];
    }

    if (this.state.error) {
      const message = {
        title: String(strings.error),
        content: String(this.state.error),
        type: 'Alert',
      };

      return (
        <Layout layoutStyle="LayoutBlank">
          <Message messageStyle="Medium" {...message} timed={false} />
        </Layout>
      );
    }

    const searchBar = (
      <InlineForm onSubmit={this.ctrl.submit} submitLabel={strings.submit}>
        <TextInput label="terms" className="FormElement" placeholder={strings.placeholder} value={this.state.searchTerms} inline />
      </InlineForm>
    );

    if (results === null || profiles.length === 0 && adverts.length === 0) {
      return (
        <div>
          <Layout layoutStyle="LayoutBlank">
            {searchBar}
            {
              this.state.searchTerms.length < 3 &&
                <Information infoStyle="Warning Small MarginAuto LineSpaced">{strings.longerTerms}</Information>
            }
            {
              results && this.state.searchTerms !== '' &&
                <Information infoStyle="Info Small MarginAuto LineSpaced">{strings.noResult}</Information>
            }
            {
              results === null &&
                <Loader />
            }
          </Layout>
        </div>
      );
    }

    return (
      <div className="Center">
        <Layout layoutStyle="LayoutBlank">
          {searchBar}
        </Layout>

        <List wrapChildren={false} listStyle="ListGrid Center">
          {
            (profiles.length > 0) &&
              <Element key={0} elementStyle="Tight Half Transparent NoWrap">
                <List elementStyle="Tight Auto Clickable" listStyle="WidthFull">
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
                </List>
              </Element>
          }
          {
            (adverts.length > 0) &&
              <Element key={1} elementStyle="Tight Half Transparent NoWrap Top">
                <List elementStyle="Tight Auto Clickable" listStyle="WidthFull">
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
                </List>
              </Element>
          }
        </List>
      </div>
    );
  }
}
