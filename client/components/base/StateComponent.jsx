import React from 'react';

const comparator = require('deep-diff');
const COMPARISON_DEPTH = 5;


export class StateComponent extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {};
  }

  updateState(newState) {
    const prefilter = path => path.length < COMPARISON_DEPTH;

    if (comparator.diff(newState, this.state, prefilter) === undefined) {
      this.setState(newState);
    }
  }
}
