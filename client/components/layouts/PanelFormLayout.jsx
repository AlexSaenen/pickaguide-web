import React from 'react';

import { PropsComponent } from 'base/PropsComponent.jsx';
import { Panel } from 'layoutFramework/Panel.jsx';
import { FormLayout } from 'layouts/FormLayout.jsx';


export class PanelFormLayout extends PropsComponent {

  constructor(props, context) {
    super(props, context);

    this.state = props;
  }

  render() {
    return (
      <Panel>
        <FormLayout {...this.state} >
          {this.state.children}
        </FormLayout>
      </Panel>
    );
  }
}

PanelFormLayout.propTypes = {
  children: React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.array]),
};
