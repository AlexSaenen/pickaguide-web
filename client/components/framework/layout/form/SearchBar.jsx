import React from 'react';

import { InlineForm } from 'form/InlineForm.jsx';
import { TextInput } from 'form/TextInput.jsx';

import 'scss/framework/form.scss';
import 'scss/main/menu/entry.scss';


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
          <TextInput className="FormElement" placeholder="Search anything" inline />
        </InlineForm>
      </div>
    );
  }
}
