import React from 'react';

import { InlineForm } from './InlineForm.jsx';
import { TextInput } from './TextInput.jsx';

import 'scss/components/_form.scss';
import 'scss/components/menu/_mainMenu.scss';

export class SearchBar extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(form) {
    console.log('Fck Yeah', form);
  }

  render() {
    return (
      <div className="MenuEntry">
        <InlineForm onSubmit={this.handleSubmit} submitLabel="Search">
          <TextInput className={"FormElement"} placeholder="Search anything" inline />
        </InlineForm>
      </div>
    );
  }
}
