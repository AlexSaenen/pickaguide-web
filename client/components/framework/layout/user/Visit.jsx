import React from 'react';
import { browserHistory } from 'react-router';

import { Layout } from 'layout/containers/Layout.jsx';
import { List } from 'layout/list/List.jsx';
import { Picture } from 'layout/elements/Picture.jsx';
import { Button } from 'layout/elements/Button.jsx';
import { Title } from 'layout/elements/Title.jsx';
import { Information } from 'layout/elements/Information.jsx';
import { strings } from './Visit_lang.js';

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
            <Information infoStyle="Alert Small MarginAuto">{strings.noExist}</Information>
        }

        <Title>{visit.about ? visit.about.title : String(strings.noTitle)}</Title>
        <p className="Small Italic Inline">{strings.with}</p>
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
                    <p className="Italic">{strings.noContact}</p>
                }
              </Layout>
            </div>
        }

        <div className="Margin" />
        {
          visit.about && props.clickable &&
            <Button onCallback={() => { goToAdvert(props.type, visit.about._id); }} label={strings.linkAdvert} buttonStyle="Auto" />
        }
        {props.addon}
      </Layout>

      <Layout>
        <hr className="Overlay" />

        <List listStyle="ListGrid" elementStyle="SoftShadowNonHover W30E MW90">
          <Layout>
            <p className="Inline LineSpaced Italic">{strings.str1}{whenDate >= new Date().toDateString() ? String(strings.str2) : String(strings.str3)}{strings.str4}</p>
            <p className="Bold Inline Blue">{whenDate}</p>
            <p className="Inline Italic">{strings.str5}</p>
            <p className="Bold Inline Blue">{whenTime}</p>
            <br />
            <p className="Inline LineSpaced Italic">{strings.str6}</p>
            <p className="Bold Inline Blue">{new Date(visit.creationDate).toDateString()}</p>
            <p className="Inline Italic">{strings.str7}</p>
            <p className="Bold Inline Blue">{new Date(visit.creationDate).toLocaleTimeString()}</p>
            <br />
            <p className="Inline LineSpaced Italic">{strings.str8}</p>
            <p className="Bold Inline Blue">{visit.numberVisitors === 1 ? String(strings.str9) : String(visit.numberVisitors)} {visit.numberVisitors > 1 ? String(strings.str10) : String(strings.str11)}</p>
            {
              visit.special ?
                <div className="LineSpaced">
                  <p className="Inline Italic">{strings.str12}</p>
                  <p className="Bold Inline">"{visit.special}"</p>
                </div>
                :
                <p className="Inline Italic">{strings.str13}</p>
            }
          </Layout>

          <Layout>
            <Title smaller>{strings.titleStatus}</Title>
            <br className="Margin" />

            {
              visit.status.map((state, index) => {
                const isBad = ['denied', 'cancelled'].indexOf(state.label) !== -1;
                const isGood = state.label === 'accepted';
                const isOkay = state.label === 'waiting';
                const isCompleted = state.label === 'finished';

                const statusLabelStyle = `Bold Inline OverflowHidden TextOverflow ${isBad ? 'Red' : ''}${isGood ? 'Green' : ''}${isOkay ? 'Blue' : ''}${isCompleted ? 'Secondary' : ''}`;

                return (
                  <div key={index}>
                    <p className="Inline Italic">{strings.text1}</p>
                    <p className="Bold Inline Blue">{new Date(state.date).toDateString()}</p>
                    <p className="Inline Italic">{strings.text2}</p>
                    <p className="Bold Inline Blue">{new Date(state.date).toLocaleTimeString()}</p>
                    <p className="Inline Italic">{strings.text3}</p>
                    <p className={statusLabelStyle}>{state.label}</p>
                    <p className="Inline Italic">{strings.text4}</p>
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
            <List listStyle="ListGrid" elementStyle="Tight MW30 Vertical">
              {
                visit.about.images.map((image, index) => <Picture key={index} url={image} pictureName={strings.pictureName} pictureType="WidthLimited" full />)
              }
            </List>
        }
        {
          visit.about === undefined &&
            <Picture url="/assets/images/deleted.png" pictureName={strings.pictureName2} pictureType="WidthLimited" full />
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
