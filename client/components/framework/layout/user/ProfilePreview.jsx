import React from 'react';

import { Picture } from 'layout/elements/Picture.jsx';
import { CheckMark } from 'layout/elements/CheckMark.jsx';

import 'scss/views/profiles.scss';


export class ProfilePreview extends React.Component {

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
      <div onClick={this.onClick} className="ProfilePreview">
        <Picture url={this.props.avatar} pictureType="HeightLimited" />
        <div className="DescriptionSection">
          <div>
            <p className="Spaced Medium Inline">{this.props.displayName}</p>
            {
              !!this.props.rate &&
                <div className="star-ratings-css">
                  <div className="star-ratings-css-top" style={{ width: `${this.props.rate * 20}%` }}><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
                  <div className="star-ratings-css-bottom"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
                </div>
            }
          </div>
          {
            this.props.city &&
              <p className="Inline LineSpaced">{this.props.city}{this.props.country ? ',' : ''}</p>
          }
          {
            this.props.country &&
              <p className={`Bold Inline ${this.props.city ? '' : 'LineSpaced'}`}>{this.props.country}</p>
          }
          <p className={`ExtraSmall Italic OverflowHidden MultiLineTextOverflow ${this.props.city && this.props.country ? '' : 'LineSpaced'}`}>{this.props.description}</p>
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
  onClick: React.PropTypes.func.isRequired,
  displayName: React.PropTypes.string.isRequired,
  country: React.PropTypes.string,
  city: React.PropTypes.string,
  description: React.PropTypes.string.isRequired,
  avatar: React.PropTypes.string.isRequired,
  isConfirmed: React.PropTypes.bool.isRequired,
};
