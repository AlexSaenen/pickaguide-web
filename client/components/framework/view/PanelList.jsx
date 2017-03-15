import React from 'react';

import { PropsComponent } from 'base/PropsComponent.jsx';
import { Panel } from 'layout/Panel.jsx';
import { List } from 'layout/List.jsx';
import { Layout } from 'layout/Layout.jsx';


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
