import React from 'react';

import { PropsComponent } from 'base/PropsComponent.jsx';
import { Panel } from 'layout/containers/Panel.jsx';
import { Layout } from 'layout/containers/Layout.jsx';


export class PanelLayout extends PropsComponent {

  render() {
    return (
      <Panel {...this.props}>
        <Layout layoutStyle={this.state.layoutStyle}>
          {this.props.children}
        </Layout>
      </Panel>
    );
  }
}

PanelLayout.defaultProps = {
  layoutStyle: 'LayoutBlank',
};

PanelLayout.propTypes = {
  children: React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.array]),
  layoutStyle: React.PropTypes.string,
};
