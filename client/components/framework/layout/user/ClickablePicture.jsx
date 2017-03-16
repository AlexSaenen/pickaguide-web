import React from 'react';

import { PropsComponent } from 'base/PropsComponent.jsx';
import { Picture } from 'layout/elements/Picture.jsx';

import 'scss/framework/layout/user.scss';

export class ClickablePicture extends PropsComponent {

  constructor(props, context) {
    super(props, context);

    this.state = {
      onClick: props.onClick,
    };
  }

  render() {
    return (
      <div onClick={this.state.onClick} className="ClickablePicture">
        <Picture pictureName="Photo URL" {...this.props} />
      </div>
    );
  }
}

ClickablePicture.propTypes = {
  onClick: React.PropTypes.func.isRequired,
};
