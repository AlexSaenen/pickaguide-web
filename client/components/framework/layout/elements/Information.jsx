import React from 'react';

import { Text } from 'layout/elements/Text.jsx';

import 'scss/framework/information.scss';


export class Information extends React.Component {

  constructor(props, context) {
    super(props, context);


    this.state = { active: props.active };
    this.content = props.content || props.children;
    this.dismiss = this.dismiss.bind(this);
  }

  dismiss() {
    const stateCopy = Object.assign({}, this.state);
    stateCopy.active = false;
    this.setState(stateCopy);
  }

  render() {
    let classes = `Information ${this.state.active ? '' : 'Hidden'} ${this.props.infoStyle}`;

    return (
      <div className={classes}>
        <div className="Header">
          <span onClick={this.dismiss}>Close</span>
        </div>

        <div className="Content">
          <p>{this.content}</p>
        </div>
      </div>
    );
  }
}

Information.defaultProps = {
  active: true,
  infoStyle: 'Info',
};

Information.propTypes = {
  content: React.PropTypes.string,
  active: React.PropTypes.bool,
  children: React.PropTypes.string,
  infoStyle: React.PropTypes.string,
};
