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
import { Loader } from 'layout/elements/Loader.jsx';
import { strings } from './Search_lang.js';
import { Profiles, Adverts, Filters } from './Search';

export class Search extends StoreObserver {

  constructor(props, context) {
    super(props, context, SearchStore);

    this.state = {
      results: null,
      error: null,
      searchTerms: props.params.terms.trim(),
      showFilters: false,
    };

    this.ctrl = new FormController();
    this.ctrl.attachSubmit((form) => {
      if (form.terms && form.terms.trim().length > 0) {
        browserHistory.push(`/search/${encodeURIComponent(form.terms.trim())}`);
      }
    });
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
      <Layout layoutStyle="LayoutBlank SoftShadow AutoWidthContent MarginAuto PaddingOne">
        <InlineForm onSubmit={this.ctrl.submit} submitLabel={strings.submit}>
          <TextInput displayLabel={false} label="terms" className="FormElement PaddingLeft" placeholder={strings.placeholder} value={this.state.searchTerms} inline />
        </InlineForm>
      </Layout>
    );

    if (results === null || (profiles.length === 0 && adverts.length === 0)) {
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

        <Filters />

        <List wrapChildren={false} listStyle="ListGrid Center WidthFull">
          {(profiles.length > 0) &&
            <Profiles {...{ profiles, avatars, areConfirmed, ids }} />
          }
          {(adverts.length > 0) &&
            <Adverts adverts={adverts.filter(advert => advert.hide !== true)} />
          }
        </List>
      </div>
    );
  }
}
