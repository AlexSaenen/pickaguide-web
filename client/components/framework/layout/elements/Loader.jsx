import React from 'react';

export class Loader extends React.Component {

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div className="Loader">
        <img className="MarginAuto" role="presentation" src="/assets/images/loader.gif" width="30" height="30" />
      </div>
    );
  }
}
