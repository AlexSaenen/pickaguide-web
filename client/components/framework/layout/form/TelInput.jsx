import React from 'react';

import { Input } from 'form/Input.jsx';

import 'scss/framework/form.scss';


export class TelInput extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = props;
  }

  render() {
    const props = Object.assign({}, this.state);
    props.type = 'tel';
    props.pattern = /^(?:0|\(?\+33\)?\s?|0033\s?)[1-79](?:[\.\-\s]?\d\d){4}$/;

    return (
      <Input {...props} />
    );
  }
}
