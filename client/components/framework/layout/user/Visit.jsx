import React from 'react';
import { browserHistory } from 'react-router';

import { ClickablePicture } from 'layout/user/ClickablePicture.jsx';
import { Layout } from 'layout/containers/Layout.jsx';
import { Panel } from 'layout/containers/Panel.jsx';
import { Button } from 'layout/elements/Button.jsx';
import { Picture } from 'layout/elements/Picture.jsx';
import { Title } from 'layout/elements/Title.jsx';
import { SubTitle } from 'layout/elements/SubTitle.jsx';
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
      {
        visit.about === null &&
          <Information infoStyle="Alert Small MarginAuto">The advert doesn't exist anymore</Information>
      }

      <Title>{visit.about ? visit.about.title : 'Title not available'}</Title>
      <p className="Small Italic Inline">with </p>
      <p className="Small Bold Inline">{visit.with}</p>
      {
        visit.about && props.clickable &&
          <p className="Small Italic"> for more information about the advert, click on the picture below</p>
      }

      <br />
      <Button buttonStyle="Auto TextWhite Bold LineSpaced" onCallback={browserHistory.goBack} label="Back" />

      <Panel panelStyle={`LessSpaced ${visit.about ? '' : 'Small'}`}>
        <Layout layoutStyle="NoWrap">
          {
            visit.about && props.clickable &&
              <ClickablePicture url={visit.about.photoUrl} pictureName="Advert Cover" pictureType="WidthLimited" full onClick={() => { goToAdvert(props.type, visit.about._id); }} />
          }
          {
            visit.about === null ?
              <Picture url="https://d30y9cdsu7xlg0.cloudfront.net/png/275465-200.png" pictureName="Deleted advert" pictureType="WidthLimited" full />
            :
              <Picture url={visit.about.photoUrl} pictureName="Advert Cover" pictureType="WidthLimited" full />
          }
        </Layout>
      </Panel>

      <hr className="SpacedDivider" />

      <p className="Inline">The visit {whenDate >= new Date().toDateString() ? 'is' : 'was'} on </p>
      <p className="Bold Inline">{whenDate}</p>
      <p className="Inline"> at </p>
      <p className="Bold Inline">{whenTime}</p>
      <p className="Inline"> and created on </p>
      <p className="Bold Inline">{new Date(visit.creationDate).toDateString()}</p>
      <p className="Inline"> at </p>
      <p className="Bold Inline">{new Date(visit.creationDate).toLocaleTimeString()}</p>

      <br />

      <p className="Inline">with </p>
      <p className="Bold Inline">{String(visit.numberVisitors)}</p>
      <p className="Inline"> {visit.numberVisitors > 1 ? 'visitors' : 'visitor'}</p>

      {
        visit.special ?
          <div className="Inline">
            <p className="Inline"> and a special request stating: "</p>
            <p className="Bold Inline">{visit.special}</p>
            <p className="Inline">"</p>
          </div>
          :
          <p className="Inline"> and no special request</p>
      }

      <br /><br /><br />
      <SubTitle>Status history</SubTitle>

      {
        visit.status.map((state, index) => {
          return (
            <div key={index}>
              <p className="Inline">On </p>
              <p className="Bold Inline">{new Date(state.date).toDateString()}</p>
              <p className="Inline"> at </p>
              <p className="Bold Inline">{new Date(state.date).toLocaleTimeString()}</p>
              <p className="Inline"> to </p>
              <p
                className={
                  `Bold Inline OverflowHidden TextOverflow
                  ${['denied', 'cancelled'].indexOf(state.label) !== -1 ? 'Red' : ''}
                  ${state.label === 'finished' ? 'Green' : ''}
                  ${state.label === 'accepted' ? 'Blue' : ''}`
                }
              >{state.label}</p>
              <p className="Inline"> stating </p>
              <p className="Bold Inline">{state.message}</p>
            </div>
          );
        })
      }
    </div>
  );
};

Visit.propTypes = {
  clickable: React.PropTypes.bool.isRequired,
  type: React.PropTypes.string,
};

export default Visit;
