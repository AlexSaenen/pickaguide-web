import React from 'react';
import { browserHistory } from 'react-router';

import { Layout } from 'layout/containers/Layout.jsx';
import { List } from 'layout/list/List.jsx';
import { Picture } from 'layout/elements/Picture.jsx';
import { Button } from 'layout/elements/Button.jsx';
import { Title } from 'layout/elements/Title.jsx';
import { Information } from 'layout/elements/Information.jsx';

const goToAdvert = (type, id) => {
  browserHistory.push(`/guide/adverts/${type === 'guide' ? 'mine/' : ''}${id}`);
};

const Visit = (props) => {
  const visit = props.visit;
  const whenDate = new Date(visit.when).toDateString();
  const whenTime = new Date(visit.when).toLocaleTimeString();

  return (
    <div>
      <Layout>
        {
          visit.about === null &&
            <Information infoStyle="Alert Small MarginAuto">The advert doesn't exist anymore</Information>
        }

        <Title>{visit.about ? visit.about.title : 'Title not available'}</Title>
        <p className="Small Italic Inline">with </p>
        <p className="Small Bold Inline">{visit.with}</p>
        {
          visit.contact &&
            <div>
              <div className="Margin" />
              <Layout layoutStyle="SoftShadowNonHover Tight AutoWidthContent MarginAuto">
                {
                  <p className="Italic">{visit.contact.phone || ''}{visit.contact.email && visit.contact.phone ? '  -  ' : ''}{visit.contact.email || ''}</p>
                }
                {
                  !visit.contact.email && !visit.contact.phone &&
                    <p className="Italic">No contact info available</p>
                }
              </Layout>
            </div>
        }

        <div className="Margin" />
        {
          visit.about && props.clickable &&
            <Button onCallback={() => { goToAdvert(props.type, visit.about._id); }} label="See advert" buttonStyle="Auto" />
        }
        {props.addon}
      </Layout>

      <Layout>
        <hr className="Overlay" />

        <List listStyle="ListGrid" elementStyle="SoftShadowNonHover W30E MW90">
          <Layout>
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

          <Layout>
            <Title smaller>Status history</Title>
            <br className="Margin" />

            {
              visit.status.map((state, index) => {
                return (
                  <div key={index}>
                    <p className="Inline Italic">On </p>
                    <p className="Bold Inline Blue">{new Date(state.date).toDateString()}</p>
                    <p className="Inline Italic"> at </p>
                    <p className="Bold Inline Blue">{new Date(state.date).toLocaleTimeString()}</p>
                    <p className="Inline Italic"> to </p>
                    <p
                      className={
                        `Bold Inline OverflowHidden TextOverflow
                        ${['denied', 'cancelled'].indexOf(state.label) !== -1 ? 'Red' : ''}
                        ${state.label === 'finished' ? 'Green' : ''}
                        ${state.label === 'accepted' ? 'Blue' : ''}`
                      }
                    >{state.label}</p>
                    <p className="Inline Italic"> stating </p>
                    <p className="Bold Inline">"{state.message}"</p>
                    <br />
                    <br />
                  </div>
                );
              })
            }
          </Layout>
        </List>

        {
          visit.about &&
            <List listStyle="ListGrid" elementStyle="Tight MW30">
              {
                visit.about.images.map((image, index) => <Picture key={index} url={image} pictureName="Advert Cover" pictureType="WidthLimited" full />)
              }
            </List>
        }
        {
          visit.about === undefined &&
            <Picture url="/assets/images/deleted.png" pictureName="Deleted advert" pictureType="WidthLimited" full />
        }
      </Layout>
    </div>
  );
};

Visit.propTypes = {
  type: React.PropTypes.string,
  addon: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.array,
  ]),
};

export default Visit;
