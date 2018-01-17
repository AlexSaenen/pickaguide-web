import React from 'react';

import { Layout } from 'layout/containers/Layout.jsx';
import { List } from 'layout/list/List.jsx';
import { strings } from './Travelbook.lang.js';
import { StoreObserver } from 'base/StoreObserver.jsx';
import BooksStore from 'stores/user/Books.js';
import BookActions from 'actions/Book.js';
import { Information } from 'layout/elements/Information.jsx';
import { Loader } from 'layout/elements/Loader.jsx';
import { Title } from 'layout/elements/Title.jsx';
import { Chapter } from 'views/Book/ChapterPreview.jsx';


export class Travelbook extends StoreObserver {

  constructor(props, context) {
    super(props, context, BooksStore);

    this.state = { visits: null };
  }

  onStore(store) {
    const newState = Object.assign({}, this.state);

    if (store.error) {
      newState.error = store.error;
    } else {
      newState.visits = store.visits;
      newState.error = null;
    }

    this.setState(newState);
  }

  componentDidMount() {
    super.componentDidMount();
    if (this.state.visits === null) {
      BookActions.get.defer();
    }
  }

  render() {
    const visits = this.state.visits;

    return (
      <div>
        <Layout>
          <Title>{strings.title}</Title>
        </Layout>

        {
          visits && visits.length > 0 ?
            <Layout layoutStyle="LayoutBlank">
              <hr className="Overlay" />
              <List listStyle="ListGrid" elementStyle="Transparent NoWrap">
                {
                  visits.map((visit, index) => {
                    return <Chapter {...visit} key={index} />;
                  })
                }
              </List>
            </Layout>
          :
            <Layout layoutStyle="LayoutBlank">
              <hr className="Overlay" />
              {
                visits === null ?
                  <Loader />
                :
                  <div>
                    <Information infoStyle="Info Small MarginAuto LineSpaced">{strings.noVisit}</Information>
                    <Layout layoutStyle="LayoutRegular SoftShadowNonHover AutoWidthContent MarginAuto">
                      <p>{strings.later}</p>
                    </Layout>
                  </div>
              }
            </Layout>
        }
      </div>
    );
  }
}

export default Travelbook;
