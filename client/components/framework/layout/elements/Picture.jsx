import React from 'react';

import { PropsComponent } from 'base/PropsComponent.jsx';

import 'scss/framework/layout.scss';


export class Picture extends PropsComponent {

  constructor(props, context) {
    super(props, context);

    this.state = props;
  }

  render() {
    const classNames = `Picture ${this.state.pictureType}`;

    return (
      <div className={classNames}>
        <img alt={this.state.pictureName} src={this.state.url} />
      </div>
    );
  }

}

Picture.defaultProps = {
  pictureName: 'None',
  pictureType: '',
};

Picture.propTypes = {
  pictureName: React.PropTypes.string,
  url: React.PropTypes.string.isRequired,
  pictureType: React.PropTypes.string,
};
