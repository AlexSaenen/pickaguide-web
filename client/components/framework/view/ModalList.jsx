import React from 'react';

import { PropsComponent } from 'base/PropsComponent.jsx';
import { Modal } from 'layout/Modal.jsx';
import { List } from 'layout/List.jsx';
import { Layout } from 'layout/Layout.jsx';


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
