import React from 'react';

import { Picture } from 'layout/elements/Picture.jsx';
import { PropsComponent } from 'base/PropsComponent.jsx';
import { Slider } from 'layout/form/Slider.jsx';
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
        <DeleteAction className="ExtraMargin" onClick={this.onDelete} />
        <Picture url={this.props.images[0]} pictureType="WidthLimited" />
        <div className="Padding">
          <br />
          <div onClick={(e) => { e.stopPropagation(); }}>
            <Slider checked={this.state.active} onChange={this.toggleAdvertState} />
          </div>
          {
            !!this.props.rate &&
            <div className="star-ratings-css LineSpaced">
              <div className="star-ratings-css-top" style={{ width: `${this.props.rate * 20}%` }}><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
              <div className="star-ratings-css-bottom"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
            </div>
          }
          <p className="Medium Bold Margin">{this.props.title}</p>
          <p className="OverflowHidden Italic TextOverflow">{this.props.city}, {this.props.country}</p>
          <p className="Spaced OverflowHidden TextOverflow">{this.props.description}</p>
        </div>
      </div>
    );
  }
}

OwnerAdvertPreview.defaultProps = {
  rate: undefined,
};

OwnerAdvertPreview.propTypes = {
  onClick: React.PropTypes.func.isRequired,
  title: React.PropTypes.string.isRequired,
  description: React.PropTypes.string.isRequired,
  active: React.PropTypes.bool.isRequired,
  rate: React.PropTypes.number,
};
