import React from 'react';

import { PropsComponent } from 'base/PropsComponent.jsx';
import { Modal } from 'layout/containers/Modal.jsx';
import { Layout } from 'layout/containers/Layout.jsx';
import { List } from 'layout/list/List.jsx';


export class ModalList extends PropsComponent {

  render() {
    return (
      <Modal {...this.props}>
        <Layout {...this.props}>
          <List {...this.props} >
            {this.props.children}
          </List>
        </Layout>
      </Modal>
    );
  }
}

ModalList.propTypes = {
  children: React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.array]),
};
