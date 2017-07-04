import React from 'react';

import { PropsComponent } from 'base/PropsComponent.jsx';
import { FormController } from 'base/FormController.jsx';
import { Panel } from 'layout/containers/Panel.jsx';
import { Form } from 'layout/form/Form.jsx';


export class PanelForm extends PropsComponent {

  render() {
    return (
      <Panel {...this.props}>
        <Form {...this.props} onSubmit={this.props.controller.submit} onReset={this.props.controller.reset}>
          {this.props.children}
        </Form>
      </Panel>
    );
  }
}

PanelForm.defaultProps = {
  controller: new FormController(),
};

PanelForm.propTypes = {
  children: React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.array]),
  controller: React.PropTypes.object,
};
