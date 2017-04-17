import React from 'react';

import { Picture } from 'layout/elements/Picture.jsx';
import { CheckMark } from 'layout/elements/CheckMark.jsx';

import 'scss/views/profiles.scss';


export class ProfilePreview extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.id = props._id;
    // this.clickHandler = props.onClick;
    // this.onClick = this.onClick.bind(this);
  }

  // onClick() {
  //   this.clickHandler(this.id);
  // }

  render() {
    // <div onClick={this.onClick} className="AdvertPreview">
    return (
      <div className="ProfilePreview">
        <Picture url={this.props.photoUrl} pictureType="HeightLimited" />
        <div className="DescriptionSection">
          <div>
            <CheckMark active={this.props.isConfirmed} />
            <p className="Spaced Medium Inline">{this.props.displayName}</p>
          </div>
          <p className="Inline LineSpaced">{this.props.city}, </p>
          <p className="Bold Inline">{this.props.country}</p>
          <p className="ExtraSmall Italic OverflowHidden MultiLineTextOverflow">{this.props.description}</p>
        </div>
      </div>
    );
  }
}

ProfilePreview.defaultProps = {
  city: 'Unknown',
  country: 'Unknown',
};

ProfilePreview.propTypes = {
  _id: React.PropTypes.string.isRequired,
  // onClick: React.PropTypes.func.isRequired,
  displayName: React.PropTypes.string.isRequired,
  country: React.PropTypes.string,
  city: React.PropTypes.string,
  description: React.PropTypes.string.isRequired,
  photoUrl: React.PropTypes.string.isRequired,
  isConfirmed: React.PropTypes.bool.isRequired,
};
