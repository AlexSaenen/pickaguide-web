import React from 'react';

import { PropsComponent } from 'base/PropsComponent.jsx';
import { Panel } from 'layout/Panel.jsx';
import { Form } from 'layout/Form.jsx';


export class PanelForm extends PropsComponent {

  render() {
    return (
      <Panel {...this.props}>
        <Form {...this.props} >
          {this.props.children}
        </Form>
      </Panel>
    );
  }
}

PanelForm.propTypes = {
  children: React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.array]),
};
