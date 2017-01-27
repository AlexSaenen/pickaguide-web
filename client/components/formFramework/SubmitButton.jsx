import React from 'react';

import 'scss/components/_form.scss';


export class SubmitButton extends React.Component {

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
