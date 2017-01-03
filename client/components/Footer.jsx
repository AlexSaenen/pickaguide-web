import React from 'react';

export class Footer extends React.Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div>
        <p>This is the footer</p>
      </div>
    );
  }
}
