import React from 'react';

import { PropsComponent } from 'base/PropsComponent.jsx';
import { Modal } from 'layout/containers/Modal.jsx';
import { Layout } from 'layout/containers/Layout.jsx';
import { Picture } from 'layout/elements/Picture.jsx';


export class ImageModal extends PropsComponent {

  constructor(props, context) {
    super(props, context);

    this.state = {
      image: props.image,
    };
  }

  render() {
    return (
      <Modal {...this.props}>
        <Layout layoutStyle="Tight NoWrap">
          <Picture
            pictureName="Full Size"
            pictureType="WidthFull MSize"
            url={this.state.image}
          />
        </Layout>
      </Modal>
    );
  }
}

ImageModal.propTypes = {
  image: React.PropTypes.string.isRequired,
};
