import React from 'react';

import 'scss/framework/information.scss';


export class InformationWithClose extends React.Component {

  constructor(props, context) {
    super(props, context);


    this.state = { active: props.active };
    this.content = props.content || props.children;
    this.dismiss = this.dismiss.bind(this);
  }

  dismiss() {
    const newState = Object.assign({}, this.state);
    newState.active = false;
    this.setState(newState);
  }

  render() {
    let classes = `Information WithClose ${this.state.active ? '' : 'Hidden'} ${this.props.infoStyle}`;

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

InformationWithClose.defaultProps = {
  active: true,
  infoStyle: 'Info',
};

InformationWithClose.propTypes = {
  content: React.PropTypes.string,
  active: React.PropTypes.bool,
  children: React.PropTypes.string,
  infoStyle: React.PropTypes.string,
};
