import React from 'react';
import { browserHistory } from 'react-router';

import { InlineForm } from 'form/InlineForm.jsx';
import { TextInput } from 'form/TextInput.jsx';
import { strings } from '../../../views/Search_lang.js';

import SearchActions from 'actions/Search.js';

import 'scss/framework/form.scss';
import 'scss/main/menu/entry.scss';


export class SearchBar extends React.Component {
  constructor(props, context) {

    super(props, context);

    this.state = { visible: false };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onRouteChange = this.onRouteChange.bind(this);
    this.unlistenRouteChanges = () => {};
  }

  componentDidMount() {
    this.unlistenRouteChanges = this.context.router.listen(this.onRouteChange);
  }

  componentWillUnmount() {
    this.unlistenRouteChanges();
  }

  onRouteChange(location) {
    const searchRouteRegex = /^\/search\//;
    const newState = Object.assign({}, this.state);
    const matches = searchRouteRegex.exec(location.pathname);

    if (newState.visible && matches) {
      newState.visible = false;
    } else if (newState.visible === false && !matches) {
      newState.visible = true;
    } else {
      return;
    }

    this.setState(newState);
  }

  handleSubmit(form) {
    if (form.terms && form.terms.length > 0) {
      browserHistory.push(`/search/${encodeURIComponent(form.terms)}`);
    }
  }

  render() {
    return (
      <div className={`MenuEntry ${this.state.visible ? '' : 'Hidden'}`}>
        <InlineForm onSubmit={this.handleSubmit} submitLabel={strings.submit}>
          <TextInput label="terms" className="FormElement" placeholder={strings.placeholder} inline />
        </InlineForm>
      </div>
    );
  }
}

SearchBar.contextTypes = {
  router: React.PropTypes.object.isRequired,
};
