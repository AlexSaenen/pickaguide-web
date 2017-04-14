import React from 'react';

import { StoreObserver } from 'base/StoreObserver.jsx';
import SearchActions from 'actions/Search.js';
import SearchStore from 'stores/Search.js';
import { InlineForm } from 'form/InlineForm.jsx';
import { TextInput } from 'form/TextInput.jsx';
import { PanelList } from 'view/PanelList.jsx';
import { Element } from 'layout/list/Element.jsx';


export class Search extends StoreObserver {

  constructor(props, context) {
    super(props, context, SearchStore);

    this.state = {
      results: SearchStore.getState().resultSearch,
      searchTerms: "",
    };
    console.log(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(form) {
    console.log(form);
    SearchActions.search(form);
  }

  onStoreChange(store) {
  }

  render() {
    const results = this.state.results;
    // const account = this.state.account;
    // const profile = this.state.profile;
    var profil = [];
    if (results == null || results.profil == null)
      profil.push(<Element>No profil found</Element>);
    else {
      profil.push(<h1>Profils finded</h1>);
      for (var i = 0; i < results.profil.length; i++) {
        profil.push(<Element>name: {results.profil[i].name}<br/>age: {results.profil[i].age}</Element>);
      }
    }
    var advert = [];
    if (results == null || results.advert == null)
      advert.push(<Element>No advert found</Element>);
    else {
      advert.push(<h1>Adverts finded</h1>);
      for (var i = 0; i < results.advert.length; i++) {
        advert.push(<Element>city: {results.advert[i].city}<br/>description: {results.advert[i].description}</Element>);
      }
    }
    return (

      <div>
        <PanelList wrapChildren={false} panelStyle="Large">
          <Element>
            <InlineForm onSubmit={this.handleSubmit} submitLabel="Search">
              <TextInput className="FormElement" placeholder="Search anything" value={this.state.searchTerms} inline />
            </InlineForm>
          </Element>
        </PanelList>
        <PanelList wrapChildren={false} panelStyle="Small">
          {profil}
        </PanelList>
        <PanelList wrapChildren={false} panelStyle="Small">
          {advert}
        </PanelList>
      </div>
    );
  }
}
