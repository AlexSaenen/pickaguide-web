import React from 'react';
import { browserHistory } from 'react-router';

import { Picture } from 'layout/elements/Picture.jsx';
import { PropsComponent } from 'base/PropsComponent.jsx';
import { Button } from 'layout/elements/Button.jsx';
import { strings } from './VisitToReview_lang.js'

import 'scss/views/visits.scss';


export class VisitToReview extends PropsComponent {

  constructor(props, context) {
    super(props, context);

    this.id = props._id;
  }

  componentWillReceiveProps(nextProps) {
    this.id = nextProps._id;
    super.componentWillReceiveProps(nextProps);
  }

  render() {
    const visit = this.props;

    return (
      <div className="VisitPreview SoftShadow Margin OverflowHidden" onClick={this.onClick}>
        <Picture url={visit.about ? visit.about.images[0] : '/assets/images/deleted.png'} pictureType="HeightLimited" />

        <div className="DescriptionSection">
          {
            visit.about ?
              <p className="OverflowHidden TextOverflow Medium Bold">{visit.about.title}</p>
              :
              <p className="OverflowHidden TextOverflow Small LineSpaced Bold Red">{strings.deleted}</p>
          }
          <p className="Italic Inline LineSpaced">{strings.str1}</p>
          <p className="Bold Inline OverflowHidden TextOverflow ">{visit.with}</p>
          <p className="Italic Inline">{strings.str2}</p>
          <p className="Bold Inline OverflowHidden TextOverflow ">{new Date(visit.finalStatus.date).toDateString()}</p>
          <br />
          <div style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
            <p className="Italic Inline">{strings.str3}</p>
            <p className="Bold Inline OverflowHidden TextOverflow">"{visit.finalStatus.message}"</p>
          </div>

          <Button
            buttonStyle="Blue Auto LessSpacedTop"
            label={strings.label}
            key={1}
            onCallback={
              function callback(clickEvent) {
                clickEvent.stopPropagation();
                browserHistory.push(`/visits/${this.id}/review`);
              }.bind(this)
            }
          />
        </div>
      </div>
    );
  }
}
