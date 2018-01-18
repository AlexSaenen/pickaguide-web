import React from 'react';

import { StoreObserver } from 'base/StoreObserver.jsx';
import { Layout } from 'layout/containers/Layout.jsx';
import { List } from 'layout/list/List.jsx';
import { Button } from 'layout/elements/Button.jsx';
import { Title } from 'layout/elements/Title.jsx';
import { strings } from '../Search_lang.js';
import SearchActions from 'actions/Search.js';
import SearchStore from 'stores/Search.js';


const getAllFields = (results, name) => {
  const fields = [];

  results.adverts.forEach((advert) => {
    if (fields.indexOf(advert[name]) === -1) {
      fields.push(advert[name]);
    }
  });

  results.profiles.forEach((advert) => {
    if (fields.indexOf(advert[name]) === -1) {
      fields.push(advert[name]);
    }
  });

  return fields.map(field => ({ field, active: false }));
};

export class Filters extends StoreObserver {

  constructor(props, context) {
    super(props, context, SearchStore);

    const store = SearchStore.getState();

    this.state = {
      show: false,
      cities: getAllFields(store.results, 'city'),
      countries: getAllFields(store.results, 'country'),
      // interests: getAllFields(store.results, 'interests'),
    };

    this.toggle = this.toggle.bind(this);
    this.toggleFilter = this.toggleFilter.bind(this);
  }

  onStore() {
    // TODO here get anew the different fields if new data
  }

  toggle() {
    const visible = this.state.show;

    this.setState({
      show: !visible,
    });
  }

  toggleFilter(field, type) {
    const { cities, countries } = this.state;
    const filters = this.state[type];
    const filter = filters.find(el => el.field === field);
    filter.active = !filter.active;
    SearchActions.applyFilters.defer({ city: cities, country: countries });

    this.setState({
      [type]: filters,
    });
  }

  render() {
    const { cities, countries, show } = this.state;

    return (
      <Layout layoutStyle="LayoutBlank">
        <Layout layoutStyle="LayoutBlank AutoWidthContent MW40 SoftShadowNonHover MarginAuto">
          <Title smaller>{strings.filterTitle}</Title>
          <Button label={show ? 'Hide' : 'Show'} buttonStyle="Blue Auto MarginAuto" onCallback={this.toggle} />
          {show &&
            <List listStyle="ListStack WidthFull" elementStyle="Tight Transparent">
              {cities.length > 0 &&
                <div>
                  <p className="Italic SmallMedium">{strings.filterCity}</p>
                  <Layout layoutStyle="LayoutBlank Box Tight WidthFull NoMarginTop">
                    {cities.map(city =>
                      <Button
                        buttonStyle={`Auto LessSpaced LessSpacedTop ${city.active ? 'Blue' : 'White'}`}
                        label={city.field}
                        key={city.field}
                        onCallback={function click() { this.toggleFilter(city.field, 'cities'); }.bind(this)}
                      />
                    )}
                  </Layout>
                </div>
              }
              {countries.length > 0 &&
                <div>
                  <p className="Italic SmallMedium">{strings.filterCountry}</p>
                  <Layout layoutStyle="LayoutBlank Box Tight WidthFull">
                    {countries.map(country =>
                      <Button
                        buttonStyle={`Auto LessSpaced LessSpacedTop ${country.active ? 'Blue' : 'White'}`}
                        label={country.field}
                        key={country.field}
                        onCallback={function click() { this.toggleFilter(country.field, 'countries'); }.bind(this)}
                      />
                    )}
                  </Layout>
                </div>
              }
              {/* <p className="Italic SmallMedium">{strings.filterInterests}</p> */}
            </List>
          }
        </Layout>
      </Layout>
    );
  }
}
