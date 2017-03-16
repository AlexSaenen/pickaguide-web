import React from 'react';

import { PropsComponent } from 'base/PropsComponent.jsx';
import { Input } from 'form/Input.jsx';

import 'scss/framework/form.scss';


export class PasswordInput extends PropsComponent {

  constructor(props, context) {
    super(props, context);

    this.state = props;
  }

  render() {
    const props = Object.assign({}, this.state);
    props.type = 'password';

    return (
      <Input {...props} />
    );
  }
}
