import React from 'react';

import { Picture } from 'layout/elements/Picture.jsx';
import { PropsComponent } from 'base/PropsComponent.jsx';
import { ToggleCheckMark } from 'layout/user/ToggleCheckMark.jsx';
import AdvertsActions from 'actions/Adverts.js';


export class AdvertPreview extends PropsComponent {

  constructor(props, context) {
    super(props, context);

    this.state = props;
    this.state = { active: props.active };
    this.id = props._id;
    this.toggleAdvertState = this.toggleAdvertState.bind(this);
  }

  toggleAdvertState() {
    AdvertsActions.toggle(this.id);
  }

  render() {
    return (
      <div onClick={this.props.onClick} className="AdvertPreview">
        <Picture url={this.props.photoUrl} pictureType="WidthLimited" />
        <ToggleCheckMark active={this.state.active} onToggle={this.toggleAdvertState} />
        <p className="Medium Bold LineSpaced Spaced Inline Vertical">{this.props.title}</p>
        <p className="Bold Inline Vertical">{this.props.hourlyPrice}</p>
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
  active: React.PropTypes.bool.isRequired,
};
