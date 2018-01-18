import React from 'react';
import { browserHistory, Link } from 'react-router';

import { StoreObserver } from 'base/StoreObserver.jsx';
import { Title } from 'layout/elements/Title.jsx';
import { Button } from 'layout/elements/Button.jsx';
import { Information } from 'layout/elements/Information.jsx';
import { Layout } from 'layout/containers/Layout.jsx';
import { List } from 'layout/list/List.jsx';
import { Loader } from 'layout/elements/Loader.jsx';
import { Picture } from 'layout/elements/Picture.jsx';
import BooksStore from 'stores/user/Books.js';
import BookActions from 'actions/Book.js';
import { strings } from './Chapter.lang.js';

import 'scss/views/visits.scss';


export class Chapter extends StoreObserver {

  constructor(props, context) {
    super(props, context, BooksStore);

    this.id = this.props.params.id;
    this.state = {
      visit: undefined,
    };

    this.navigateToVisit = this.navigateToVisit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.id = nextProps.params.id;
    BookActions.find(this.id);
  }

  componentDidMount() {
    super.componentDidMount();

    if (this.state.visit === undefined) {
      BookActions.find(this.id);
    }
  }

  onStore(store) {
    if (store.specificVisit && store.specificVisit._id === this.id) {
      const visit = store.specificVisit;

      this.setState({
        visit,
      });
    }
  }

  navigateToVisit() {
    browserHistory.push(`/visits/mine/visitor/${this.id}`);
  }

  render() {
    const visit = this.state.visit;

    if (visit === undefined || visit === null) {
      return (
        <div className="Chapter">
          <Layout layoutStyle="LayoutBlank">
            <Loader />
          </Layout>
        </div>
      );
    }

    const whenDate = new Date(visit.when).toDateString();
    const whenTime = new Date(visit.when).toLocaleTimeString();

    return (
      <div className="Chapter">
        <Layout layoutStyle="LayoutBlank">
          <Title>{visit.about ? visit.about.title : 'Your travel'}</Title>
          <Button
            label="See visit"
            buttonStyle="Auto Secondary"
            onCallback={this.navigateToVisit}
          />
        </Layout>

        <Layout layoutStyle="LayoutBlank">
          <hr className="Overlay" />

          <Layout layoutStyle="SoftShadowNonHover W30E MW90 MarginAuto">
            <p className="Inline LineSpaced Italic">The visit {whenDate >= new Date().toDateString() ? 'is' : 'was'} on </p>
            <p className="Bold Inline Blue">{whenDate}</p>
            <p className="Inline Italic"> at </p>
            <p className="Bold Inline Blue">{whenTime}</p>
            <br />
            <p className="Inline LineSpaced Italic"> and created on </p>
            <p className="Bold Inline Blue">{new Date(visit.creationDate).toDateString()}</p>
            <p className="Inline Italic"> at </p>
            <p className="Bold Inline Blue">{new Date(visit.creationDate).toLocaleTimeString()}</p>
            <br />
            <p className="Inline LineSpaced Italic">with </p>
            <p className="Bold Inline Blue">{visit.numberVisitors === 1 ? 'one' : String(visit.numberVisitors)} {visit.numberVisitors > 1 ? 'visitors' : 'visitor'}</p>
            {
              visit.special ?
                <div className="LineSpaced">
                  <p className="Inline Italic"> and a special request stating: </p>
                  <p className="Bold Inline">"{visit.special}"</p>
                </div>
                :
                <p className="Inline Italic"> and no special request</p>
            }
          </Layout>

          {visit.images.length === 0 &&
            <div>
              <Information infoStyle="Info Small MarginAuto LineSpaced">No images</Information>
              <Layout layoutStyle="LayoutRegular SoftShadowNonHover AutoWidthContent MarginAuto">
                <p><Link className="Blue" to={`/travelbook/${this.id}/edit`}>Edit</Link> this travel to add some pictures you took during the visit</p>
              </Layout>
            </div>
          }
          <br />
          <br />
          <List listStyle="ListGrid" elementStyle="W20 Vertical SoftShadowNonHover Tight Inline-BlockImportant">
            {
              visit.images.map((image, index) =>
                <Picture key={index} pictureName="Travel images" pictureType="WidthFull" url={image} />
              )
            }
          </List>
        </Layout>
      </div>
    );
  }
}
