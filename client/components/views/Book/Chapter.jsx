import React from 'react';
import { browserHistory } from 'react-router';

import { PropsComponent } from 'base/PropsComponent.jsx';

import 'scss/views/visits.scss';


export class Chapter extends PropsComponent {

  constructor(props, context) {
    super(props, context);

    // this.id = props._id;
  }

  componentWillReceiveProps(nextProps) {
    // this.id = nextProps._id;
    super.componentWillReceiveProps(nextProps);
  }

  render() {
    // const visit = this.props;

    return (
      <div>
        View
      </div>
    );
  }
}
