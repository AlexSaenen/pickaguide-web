import React from 'react';

import { Picture } from 'layout/elements/Picture.jsx';


export class AdvertPreview extends React.Component {

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div onClick={this.props.onClick} className="AdvertPreview">
        <Picture url={this.props.photoUrl} pictureType="WidthLimited" />
        <p className="Medium Bold LineSpaced Spaced Inline">{this.props.title}</p>
        <p className="Bold Inline">{this.props.hourlyPrice}</p>
        <p className="Spaced OverflowHidden">{this.props.description}</p>
      </div>
    );
  }
}

AdvertPreview.propTypes = {
  onClick: React.PropTypes.func,
  // onClick: React.PropTypes.func.isRequired,
  title: React.PropTypes.string.isRequired,
  description: React.PropTypes.string.isRequired,
  hourlyPrice: React.PropTypes.string.isRequired,
  photoUrl: React.PropTypes.string.isRequired,
};
