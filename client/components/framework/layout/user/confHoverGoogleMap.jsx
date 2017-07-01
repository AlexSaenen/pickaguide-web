import React, { Component } from 'react';
import shouldPureComponentUpdate from 'react-addons-shallow-compare';
import { browserHistory } from 'react-router';

import { PropsComponent } from 'base/PropsComponent.jsx';
import { Button } from 'layout/elements/Button.jsx';
import {positionsGuidesStyle, positionsGuidesCircleStyle, positionsGuidesCircleStyleHover,
        positionsGuidesStickStyle, positionsGuidesStickStyleShadow} from 'layout/user/confGoogleMap.js';

export default class MyPositionsGuidesWithControllableHover extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {text, zIndex} = this.props;
     const style = Object.assign({}, positionsGuidesStyle);
     style.zIndex = this.props.$hover ? 1000 : zIndex;

     const circleStyle = this.props.$hover ? positionsGuidesCircleStyleHover : positionsGuidesCircleStyle;
     const stickStyle = positionsGuidesStickStyle;

    return (
       <div className="hint hint--html hint--info hint--top" style={style}>
          <div style={positionsGuidesStickStyleShadow} />
          <div style={circleStyle}>
            {text}
            <Button
              buttonStyle="Blue Auto AllSpaced"
              label="Сlick me"
              onCallback={
                function callback() {
                  browserHistory.push(`/profiles/${this.props.userId}`);
                }.bind(this)
              }
            />
          </div>
          <div style={stickStyle} />
          <div style={{width: 80}} className="hint__content">
          </div>
       </div>
    );
  }
}

MyPositionsGuidesWithControllableHover.defaultProps = {};

MyPositionsGuidesWithControllableHover.propTypes = {
  $hover: React.PropTypes.bool,
  text: React.PropTypes.string,
  own: React.PropTypes.bool,
  userId: React.PropTypes.string,
  zIndex: React.PropTypes.number
};

MyPositionsGuidesWithControllableHover.prototype.shouldComponentUpdate = shouldPureComponentUpdate;
