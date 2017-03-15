import React from 'react';

import { PropsComponent } from 'base/PropsComponent.jsx';
import { Panel } from 'layout/containers/Panel.jsx';
import { Layout } from 'layout/containers/Layout.jsx';
import { List } from 'layout/list/List.jsx';


export class PanelList extends PropsComponent {

  render() {
    return (
      <Panel {...this.props}>
        <Layout {...this.props}>
          <List {...this.props} >
            {this.props.children}
          </List>
        </Layout>
      </Panel>
    );
  }
}

PanelList.propTypes = {
  children: React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.array]),
};
