import React from 'react';

import { PropsComponent } from 'base/PropsComponent.jsx';

import 'scss/components/base/layout.scss';


export class Picture extends PropsComponent {

  constructor(props, context) {
    super(props, context);

    this.state = props;
  }

  render() {
    return (
      <div className="Picture">
        <img alt={this.state.pictureName} src={this.state.url} />
      </div>
    );
  }

}

Picture.defaultProps = {
  pictureName: 'None',
};

Picture.propTypes = {
  pictureName: React.PropTypes.string,
  url: React.PropTypes.string.isRequired,
};
