import React from 'react';

import { PropsComponent } from 'base/PropsComponent.jsx';
import { Input } from 'form/Input.jsx';

import 'scss/framework/form.scss';

const nowToInput = () => {
  const date = new Date();
  let mm = date.getMonth();
  if (mm < 10) { mm = `0${mm}`; }
  let dd = date.getDate();
  if (dd < 10) { dd = `0${dd}`; }

  return `${date.getFullYear()}-${mm}-${dd}`;
};

class DateInput extends PropsComponent {

  constructor(props, context) {
    super(props, context);

    this.state = props;
  }

  render() {
    const props = Object.assign({}, this.state);
    props.type = 'date';

    return (
      <Input {...props} />
    );
  }
}

export { DateInput, nowToInput };
