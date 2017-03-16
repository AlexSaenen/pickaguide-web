import React from 'react';

import { PropsComponent } from 'base/PropsComponent.jsx';

import 'scss/framework/form.scss';


export class SubmitButton extends PropsComponent {

  constructor(props, context) {
    super(props, context);

    this.state = props;
  }

  render() {
    return (
      <div className="FormElement">
        <input type="submit" name="Submit" value={this.state.label} />
      </div>
    );
  }
}

SubmitButton.defaultProps = {
  label: 'Submit',
};

SubmitButton.propTypes = {
  label: React.PropTypes.string,
};
