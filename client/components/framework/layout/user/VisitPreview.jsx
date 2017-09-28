import React from 'react';

import { Picture } from 'layout/elements/Picture.jsx';
import { PropsComponent } from 'base/PropsComponent.jsx';
import { Button } from 'layout/elements/Button.jsx';

import 'scss/views/visits.scss';


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
            buttonStyle="Blue Auto AllSpaced"
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
          <p className="Italic Inline LineSpaced">stating</p>
          <p className="Bold Inline OverflowHidden TextOverflow">{this.state.status.message}</p>
        </div>
      );
    }

    const isBad = ['denied', 'cancelled'].indexOf(visitStatus) !== -1;
    const isGood = visitStatus === 'finished';
    const isOkay = visitStatus === 'accepted';

    const statusLabelStyle = `Bold Inline OverflowHidden TextOverflow ${isBad ? 'Red' : ''}${isGood ? 'Green' : ''}${isOkay ? 'Blue' : ''}`;

    return (
      <div className="VisitPreview" onClick={this.onClick}>
        <Picture url={visit.about ? visit.about.photoUrl : '/assets/images/deleted.png'} pictureType="HeightLimited" />

        <div className="DescriptionSection">
          {
            visit.about ?
              <p className="OverflowHidden TextOverflow Medium Bold">{visit.about.title}</p>
              :
              <p className="OverflowHidden TextOverflow Small LineSpaced Bold Red">Advert was deleted</p>
          }
          <p className="Italic Inline LineSpaced">with</p>
          <p className="Bold Inline OverflowHidden TextOverflow ">{visit.with}</p>
          <p className="Italic Inline">on</p>
          <p className="Bold Inline OverflowHidden TextOverflow">{new Date(visit.when).toDateString()}</p>
          <br />
          <p className="Italic Inline">with status</p>
          <p className={statusLabelStyle}>{this.state.status.label}</p>
          {changeStatus}
        </div>
      </div>
    );
  }
}

VisitPreview.propTypes = {
  onClick: React.PropTypes.func.isRequired,
};
