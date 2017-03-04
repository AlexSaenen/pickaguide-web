import React from 'react';

import { PropsComponent } from 'base/PropsComponent.jsx';
import { Panel } from 'layoutFramework/Panel.jsx';
import { Layout } from 'layoutFramework/Layout.jsx';


export class PanelLayout extends PropsComponent {

  constructor(props, context) {
    super(props, context);

    this.state = props;
  }

  render() {
    return (
      <Panel>
        <Layout layoutStyle={this.state.layoutStyle}>
          {this.state.children}
        </Layout>
      </Panel>
    );
  }
}

PanelLayout.defaultProps = {
  layoutStyle: 'LayoutDark',
};

PanelLayout.propTypes = {
  children: React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.array]),
  layoutStyle: React.PropTypes.string,
};
