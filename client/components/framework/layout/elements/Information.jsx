import React from 'react';

import 'scss/framework/information.scss';


export class Information extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.content = props.content || props.children;
  }

  render() {
    let classes = `Information ${this.props.infoStyle}`;

    return (
      <div className={classes}>
        <div className="Header">
        </div>

        <div className="Content">
          <p>{this.content}</p>
        </div>
      </div>
    );
  }
}

Information.defaultProps = {
  infoStyle: 'Info',
};

Information.propTypes = {
  content: React.PropTypes.string,
  children: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.array,
  ]),
  infoStyle: React.PropTypes.string,
};
