import React from 'react';
import { browserHistory } from 'react-router';

import { Picture } from 'layout/elements/Picture.jsx';
import { PropsComponent } from 'base/PropsComponent.jsx';
import { CreateComment } from 'layout/user/CreateComment.jsx';
import { Button } from 'layout/elements/Button.jsx';
import AuthStore from 'stores/user/Auth.js';

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
      <div className="VisitToReview" onClick={this.onClick}>
        <Picture url={visit.about ? visit.about.photoUrl : 'https://d30y9cdsu7xlg0.cloudfront.net/png/275465-200.png'} pictureType="HeightLimited" />

        <div className="DescriptionSection">
          {
            visit.about ?
              <p className="OverflowHidden TextOverflow Medium LineSpaced Bold Inline">{visit.about.title}</p>
              :
              <p className="OverflowHidden TextOverflow Small LineSpaced Bold Red">Advert was deleted</p>
          }
          <br />
          <p className="Italic Inline">with</p>
          <p className="Bold Inline OverflowHidden TextOverflow ">{visit.with}</p>
          <p className="Italic Inline">finished on</p>
          <p className="Bold Inline OverflowHidden TextOverflow ">{new Date(visit.status.date).toDateString()}</p>
          <br />
          <p className="Italic Inline">stating</p>
          <p className="Bold Inline OverflowHidden TextOverflow">{visit.status.message}</p>
          <br />
          {
            visit.about && visit.about.owner !== AuthStore.getState().credentials.id &&
              <CreateComment advertId={visit.about._id} />
          }
          <Button
            buttonStyle="Blue Auto Spaced"
            label="Review"
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
