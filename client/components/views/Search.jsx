import React from 'react';
import { browserHistory } from 'react-router';

import { StoreObserver } from 'base/StoreObserver.jsx';
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


export class Search extends StoreObserver {

  constructor(props, context) {
    super(props, context, SearchStore);

    this.state = {
      results: SearchStore.getState().results,
      error: null,
      searchTerms: props.params.terms === 'none' ? '' : props.params.terms,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onStoreChange = this.onStoreChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const stateCopy = Object.assign({}, this.state);
    stateCopy.searchTerms = nextProps.params.terms === 'none' ? '' : nextProps.params.terms;
    stateCopy.error = null;
    this.updateState(stateCopy);
  }

  handleSubmit(form) {
    SearchActions.search(form);
    browserHistory.push(`/search/${encodeURIComponent(form.text)}`);
  }

  onStoreChange(store) {
    const stateCopy = Object.assign({}, this.state);

    if (store.error) {
      stateCopy.error = store.error;
    } else {
      stateCopy.results = store.results;
      stateCopy.error = null;
    }

    this.updateState(stateCopy);
  }

  render() {
    const results = this.state.results;
    const profiles = results.profiles || [];
    const ids = results.ids || [];
    const areConfirmed = results.areConfirmed || [];
    const adverts = results.adverts || [];

    if (this.state.error) {
      const message = {
        title: 'Something unusual happened',
        content: this.state.error,
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
            <InlineForm onSubmit={this.handleSubmit} submitLabel="Search">
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
          <InlineForm onSubmit={this.handleSubmit} submitLabel="Search">
            <TextInput className="FormElement" placeholder="Search anything" value={this.state.searchTerms} inline />
          </InlineForm>
        </Layout>

        {
          profiles.length > 0 ?
            <PanelList panelStyle="Wide LessSpaced" elementStyle="Tight Clickable">
              {
                profiles.map((profile, index) => {
                  return (
                    <ProfilePreview
                      {...profile}
                      _id={ids[index]}
                      isConfirmed={areConfirmed[index]}
                      key={index}
                    />
                  );
                })
              }
            </PanelList>
          :
            <Layout layoutStyle="LayoutBlank NoWrap">
              <Information infoStyle="Info Small MarginAuto">No such profiles found :(</Information>
            </Layout>
        }
        {
          adverts.length > 0 ?
            <PanelList panelStyle="Wide" elementStyle="Tight Clickable">
              {
                adverts.map((advert, index) => {
                  return <AdvertPreview {...advert} key={index} />;
                })
              }
            </PanelList>
          :
            <Layout layoutStyle="LayoutBlank">
              <Information infoStyle="Info Small MarginAuto LineSpaced">No such visits found :(</Information>
            </Layout>
        }
      </div>
    );
  }
}
