import React from 'react';

import { Picture } from 'layout/Picture.jsx';

import 'scss/framework/layout/user.scss';

export class EditPicture extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = props;
  }

  render() {
    return (
      <div onClick={this.state.onClick} className="EditPicture">
        <Picture pictureName="Photo URL" {...this.state} />
      </div>
    );
  }
}
