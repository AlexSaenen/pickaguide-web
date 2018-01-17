import React from 'react';

import { PropsComponent } from 'base/PropsComponent.jsx';
import { strings } from './strings_lang.js'

import 'scss/framework/form.scss';


export class SubmitButton extends PropsComponent {

  constructor(props, context) {
    super(props, context);

    this.state = props;
  }

  render() {
    return (
      <div className="FormElement">
        <input className={this.state.buttonStyle} type="submit" name="Submit" value={this.state.label} />
      </div>
    );
  }
}

SubmitButton.defaultProps = {
  label: String(strings.submit),
  buttonStyle: '',
};

SubmitButton.propTypes = {
  label: React.PropTypes.string,
  buttonStyle: React.PropTypes.string,
};
