import React from 'react';

import { Picture } from 'layout/elements/Picture.jsx';
import { PropsComponent } from 'base/PropsComponent.jsx';
import { ToggleCheckMark } from 'layout/user/ToggleCheckMark.jsx';
import DeleteAction from 'layout/user/DeleteAction.jsx';
import AdvertsActions from 'actions/Adverts.js';

import 'scss/views/adverts.scss';


export class OwnerAdvertPreview extends PropsComponent {

  constructor(props, context) {
    super(props, context);

    this.state = { active: props.active };
    this.id = props._id;
    this.clickHandler = props.onClick;
    this.toggleAdvertState = this.toggleAdvertState.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.id = nextProps._id;
    super.componentWillReceiveProps(nextProps);
  }

  toggleAdvertState(clickEvent) {
    clickEvent.stopPropagation();
    AdvertsActions.toggle(this.id);
  }

  onClick() {
    this.clickHandler(this.id);
  }

  onDelete(clickEvent) {
    clickEvent.stopPropagation();
    this.props.deleter.callerId = this.id;
    this.props.deleter.toggle(true);
  }

  render() {
    return (
      <div onClick={this.onClick} className="OwnerAdvertPreview">
        <DeleteAction onClick={this.onDelete} />
        <Picture url={this.props.photoUrl} pictureType="WidthLimited" />
        <ToggleCheckMark className="Inline" active={this.state.active} onToggle={this.toggleAdvertState} />
        <p className="Medium Bold">{this.props.title}</p>
        <p className="OverflowHidden Italic TextOverflow">{this.props.city}, {this.props.country}</p>
        <p className="Spaced OverflowHidden TextOverflow">{this.props.description}</p>
      </div>
    );
  }
}

OwnerAdvertPreview.propTypes = {
  onClick: React.PropTypes.func.isRequired,
  title: React.PropTypes.string.isRequired,
  description: React.PropTypes.string.isRequired,
  photoUrl: React.PropTypes.string.isRequired,
  active: React.PropTypes.bool.isRequired,
};
