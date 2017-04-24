import React from 'react';

import { Picture } from 'layout/elements/Picture.jsx';
import { CheckMark } from 'layout/elements/CheckMark.jsx';

import 'scss/views/adverts.scss';


export class AdvertPreview extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.id = props._id;
    this.clickHandler = props.onClick;
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.clickHandler(this.id);
  }

  render() {
    return (
      <div onClick={this.onClick} className="AdvertPreview">
        <Picture url={this.props.photoUrl} pictureType="WidthLimited" />
        <div className="DescriptionSection">
          <div>
            <CheckMark active={this.props.active} />
            <p className="Medium Bold Inline">{this.props.title}</p>
            <p className="Bold Inline LineSpaced">priced {this.props.hourlyPrice}</p>
          </div>
          <p className="ExtraSmall OverflowHidden MultiLineTextOverflow">{this.props.description}</p>
        </div>
      </div>
    );
  }
}

AdvertPreview.propTypes = {
  onClick: React.PropTypes.func.isRequired,
  _id: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  description: React.PropTypes.string.isRequired,
  hourlyPrice: React.PropTypes.string.isRequired,
  photoUrl: React.PropTypes.string.isRequired,
  owner: React.PropTypes.string.isRequired,
  active: React.PropTypes.bool.isRequired,
};
