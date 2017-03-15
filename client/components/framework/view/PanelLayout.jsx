import React from 'react';

import { PropsComponent } from 'base/PropsComponent.jsx';
import { Panel } from 'layout/Panel.jsx';
import { Layout } from 'layout/Layout.jsx';


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
  layoutStyle: 'LayoutDark',
};

PanelLayout.propTypes = {
  children: React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.array]),
  layoutStyle: React.PropTypes.string,
};
