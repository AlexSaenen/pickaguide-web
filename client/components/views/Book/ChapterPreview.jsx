import React from 'react';
import { browserHistory } from 'react-router';

import { PropsComponent } from 'base/PropsComponent.jsx';
import { Button } from 'layout/elements/Button.jsx';

import 'scss/views/visits.scss';


export class Chapter extends PropsComponent {

  constructor(props, context) {
    super(props, context);

    this.id = props._id;
    this.edit = this.edit.bind(this);
    this.view = this.view.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.id = nextProps._id;
    super.componentWillReceiveProps(nextProps);
  }

  edit() {
    browserHistory.push(`/travelbook/${this.id}/edit`);
  }

  view() {
    browserHistory.push(`/travelbook/${this.id}`);
  }

  render() {
    const visit = this.props;

    return (
      <div className="ChapterPreview SoftShadow Margin OverflowHidden" onClick={this.onClick}>
        <div className="Inline-Block Vertical Margin">
          {
            visit.about ?
              <p className="OverflowHidden TextOverflow Medium Bold">{visit.about.title}</p>
              :
              <p className="OverflowHidden TextOverflow Small LineSpaced Bold Red">Advert was deleted</p>
          }

          <div className="Inline Vertical">
            <p className="Italic Inline">on</p>
            <p className="Bold Inline OverflowHidden TextOverflow">{new Date(visit.when).toDateString()}</p>
          </div>
        </div>

        <div className="Inline-Block Vertical">
          <Button label="Edit" buttonStyle="Blue LessSpaced LessMarginTop" onCallback={this.edit} />
        </div>

        <div className="Inline-Block Vertical">
          <Button label="View" buttonStyle="Blue LessSpaced LessMarginTop" onCallback={this.view} />
        </div>
      </div>
    );
  }
}
