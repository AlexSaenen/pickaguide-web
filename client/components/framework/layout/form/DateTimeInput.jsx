import React from 'react';

import { PropsComponent } from 'base/PropsComponent.jsx';
import { Input } from 'form/Input.jsx';

import 'scss/framework/form.scss';

const nowToInput = (delay = 0) => {
  const date = new Date(Date.now() + delay).toISOString();
  return date.substring(0, date.lastIndexOf(':'));
};

class DateTimeInput extends PropsComponent {

  constructor(props, context) {
    super(props, context);

    this.state = props;
  }

  render() {
    const props = Object.assign({}, this.state);
    props.type = 'datetime-local';

    return (
      <Input {...props} />
    );
  }
}

export { DateTimeInput, nowToInput };
