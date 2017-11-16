import React from 'react';

import { Picture } from 'layout/elements/Picture.jsx';


export class Guide extends React.Component {

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
      <div onClick={this.onClick} className="Guide">
        <Picture url={this.props.avatar} pictureType="HeightLimited" pictureName={this.props.description} />
        <p className="Spaced Medium Inline">{this.props.firstName}</p>
      </div>
    );
  }
}

Guide.propTypes = {
  _id: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func.isRequired,
  firstName: React.PropTypes.string.isRequired,
  description: React.PropTypes.string.isRequired,
  avatar: React.PropTypes.string.isRequired,
};
