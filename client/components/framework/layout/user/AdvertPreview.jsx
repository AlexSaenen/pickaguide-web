import React from 'react';
import { browserHistory } from 'react-router';

import { Picture } from 'layout/elements/Picture.jsx';
import AvatarApi from 'services/Avatar.js';

import 'scss/views/adverts.scss';


export class AdvertPreview extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.id = props._id;
    this.userId = props.ownerId;

    this.state = {
      avatar: null,
    };

    this.clickHandler = props.onClick;
    this.onClick = this.onClick.bind(this);
    this.onStore = this.onStore.bind(this);
  }

  componentDidMount() {
    if (this.state.avatar === null && this.userId !== '') {
      AvatarApi.getAvatar(this.userId, {
        getSuccess: {
          defer: this.onStore,
        },
        error: {
          defer: () => {},
        },
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    this.id = nextProps._id;
    this.userId = nextProps.ownerId;
    this.setState({ avatar: null });
  }

  onStore(result) {
    if (result.id === this.userId) {
      this.setState({ avatar: result.avatar });
    }
  }

  onClick(e) {
    e.stopPropagation();
    this.clickHandler(this.id);
  }

  goToProfile(e) {
    e.stopPropagation();
    browserHistory.push(`/profiles/${this.userId}`);
  }

  render() {
    return (
      <div onClick={this.onClick} className="AdvertPreview">
        <div className="PictureSection" style={{ width: '20% !important' }}>
          <Picture url={this.props.photoUrl} />
        </div>

        <div className="DescriptionSection Box" style={{ width: `${this.props.owner ? '65%' : '80%'} !important`, verticalAlign: 'top !important' }}>
          <div className="LineSpaced">
            <p className="Medium Bold Inline">{this.props.title}</p>

            <p className="Inline Italic">in</p>
            <p className="Bold Inline">{this.props.city}, {this.props.country}</p>
          </div>

          <p className="Small OverflowHidden MultiLineLargeTextOverflow">{this.props.description}</p>
        </div>

        {
          this.props.owner &&
            <div className="ProfileSection Box Inline-Block HeightFull" style={{ width: '15% !important', verticalAlign: 'top !important' }}>
              <div className="AvatarSection H80 Box Padding" onClick={this.goToProfile.bind(this)}>
                <Picture url={this.state.avatar} pictureType="Clickable" />
              </div>

              <div className="NameSection H20">
                <p className="Bold Inline">{this.props.owner}</p>
              </div>
            </div>
          }
      </div>
    );
  }
}

AdvertPreview.propTypes = {
  onClick: React.PropTypes.func.isRequired,
  _id: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  city: React.PropTypes.string.isRequired,
  country: React.PropTypes.string.isRequired,
  description: React.PropTypes.string.isRequired,
  photoUrl: React.PropTypes.string.isRequired,
  owner: React.PropTypes.string,
  ownerId: React.PropTypes.string.isRequired,
};
