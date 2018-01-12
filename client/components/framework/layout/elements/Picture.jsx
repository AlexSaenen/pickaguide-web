import React from 'react';

import { PropsComponent } from 'base/PropsComponent.jsx';

import 'scss/framework/layout.scss';


export class Picture extends PropsComponent {

  constructor(props, context) {
    super(props, context);

    this.state = props;
  }

  render() {
    const classNames = `Picture ${this.state.pictureType} ${this.state.url === '' ? 'FullTransparent' : ''}`;

    return (
      <div className={classNames}>
        {
          this.state.url !== '' &&
            <img alt={this.state.pictureName} title={this.state.pictureName} src={this.state.url} className={`${this.state.radius ? 'BorderRadius' : ''}`} />
        }
      </div>
    );
  }

}

Picture.defaultProps = {
  pictureName: 'None',
  pictureType: '',
  url: '',
  radius: false,
};

Picture.propTypes = {
  pictureName: React.PropTypes.string,
  url: React.PropTypes.string,
  radius: React.PropTypes.bool,
  pictureType: React.PropTypes.string,
};
