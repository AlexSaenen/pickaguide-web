import React from 'react';

import { Picture } from 'layout/elements/Picture.jsx';
import { PropsComponent } from 'base/PropsComponent.jsx';
import { Button } from 'layout/elements/Button.jsx';
import { strings } from './VisitPreview_lang.js';

import 'scss/views/visits.scss';

const getButtonColor = (status) => {
  switch (status.capitalize()) {
    case 'Accept':
    case 'Finish':
      return 'Blue';
    case 'Deny':
    case 'Cancel':
      return 'Red';
    default:
      return 'Blue';
  }
};


export class VisitPreview extends PropsComponent {

  constructor(props, context) {
    super(props, context);

    this.state = { status: props.finalStatus };
    this.id = props._id;
    this.ctrl = props.actionCtrl;
    this.clickHandler = props.onClick;
    this.onClick = this.onClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.id = nextProps._id;
    super.componentWillReceiveProps(nextProps);
    this.setState({ status: nextProps.finalStatus });
  }

  onClick() {
    this.clickHandler(this.id, this.type);
  }

  render() {
    const visit = this.props;
    const visitStatus = this.state.status.label;
    let changeStatus = null;

    if (this.statusMapping[visitStatus] !== undefined && visit.about) {
      changeStatus = this.statusMapping[visitStatus].map((nextStatus, index) => {
        return (
          <Button
            buttonStyle={`${getButtonColor(nextStatus)} Auto LessSpacedTop`}
            label={nextStatus.capitalize()}
            key={index}
            onCallback={
              function callback(clickEvent) {
                clickEvent.stopPropagation();
                this.ctrl.feed({ callerId: this.id, actionType: clickEvent.target.innerHTML.toLowerCase() });
                this.ctrl.toggle(true);
              }.bind(this)
            }
          />
        );
      });

      changeStatus = (
        <div>{changeStatus}</div>
      );
    } else {
      changeStatus = (
        <div style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
          <p className="Italic Inline LineSpaced">{strings.starting}</p>
          <p className="Bold Inline OverflowHidden TextOverflow">"{this.state.status.message}"</p>
        </div>
      );
    }

    const isBad = ['denied', 'cancelled'].indexOf(visitStatus) !== -1;
    const isGood = visitStatus === 'accepted';
    const isOkay = visitStatus === 'waiting';
    const isCompleted = visitStatus === 'finished';

    const statusLabelStyle = `Bold Inline OverflowHidden TextOverflow ${isBad ? 'Red' : ''}${isGood ? 'Green' : ''}${isOkay ? 'Blue' : ''}${isCompleted ? 'Secondary' : ''}`;

    return (
      <div className="VisitPreview SoftShadow Margin OverflowHidden" onClick={this.onClick}>
        <Picture url={visit.about ? visit.about.images[0] : '/assets/images/deleted.png'} pictureType="HeightLimited MW30" />

        <div className="DescriptionSection">
          {
            visit.about ?
              <p className="OverflowHidden TextOverflow Medium Bold">{visit.about.title}</p>
              :
              <p className="OverflowHidden TextOverflow Small LineSpaced Bold Red">{strings.deleted}</p>
          }

          <div className="Inline Vertical">
            <p className="Italic Inline LineSpaced">{strings.with}</p>
            <p className="Bold Inline OverflowHidden TextOverflow ">{visit.with}</p>
            <p className="Italic Inline">{strings.on}</p>
            <p className="Bold Inline OverflowHidden TextOverflow">{new Date(visit.when).toDateString()}</p>
            {visit[`${this.type}Rate`] !== null &&
              <p className="Italic Inline">{strings.rated}</p>
            }
          </div>

          {visit[`${this.type}Rate`] !== null &&
            <div className="star-ratings-css Vertical">
              <div className="star-ratings-css-top" style={{ width: `${visit[`${this.type}Rate`] * 20}%` }}><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
              <div className="star-ratings-css-bottom"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
            </div>
          }

          <br />
          <p className="Italic Inline">{strings.status}</p>
          <p className={statusLabelStyle}>"{this.state.status.label}"</p>
          {changeStatus}
        </div>
      </div>
    );
  }
}

VisitPreview.propTypes = {
  onClick: React.PropTypes.func.isRequired,
};
