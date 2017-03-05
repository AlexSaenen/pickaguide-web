import React from 'react';

import { PropsComponent } from 'base/PropsComponent.jsx';
import { Panel } from 'layout/Panel.jsx';
import { Form } from 'layout/Form.jsx';


export class PanelForm extends PropsComponent {

  constructor(props, context) {
    super(props, context);

    this.state = props;
  }

  render() {
    return (
      <Panel>
        <Form {...this.state} >
          {this.state.children}
        </Form>
      </Panel>
    );
  }
}

PanelForm.propTypes = {
  children: React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.array]),
};
