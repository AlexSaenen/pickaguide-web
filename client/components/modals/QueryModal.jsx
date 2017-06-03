import React from 'react';

import { PropsComponent } from 'base/PropsComponent.jsx';
import { Modal } from 'layout/containers/Modal.jsx';
import { Layout } from 'layout/containers/Layout.jsx';
import { Text } from 'layout/elements/Text.jsx';
import { Button } from 'layout/elements/Button.jsx';


export class QueryModal extends PropsComponent {

  constructor(props, context) {
    super(props, context);

    this.state = {
      query: props.query,
    };
  }

  render() {
    let buttons =
      [
        <Button
          label="Cancel"
          buttonStyle="Red"
          key={1}
          onCallback={
            this.props.onCancel ||
            function cancel() {
              this.props.controller.toggle(false);
            }.bind(this)
          }
        />,
        <Button
          label="Confirm"
          buttonStyle="Blue"
          key={2}
          onCallback={
            function confirm() {
              this.props.onConfirm();
              this.props.controller.toggle(false);
            }.bind(this)
          }
        />];

    return (
      <Modal {...this.props} modalStyle="Small" buttons={buttons}>
        <Layout>
          <Text>{this.state.query}</Text>
        </Layout>
      </Modal>
    );
  }
}

QueryModal.propTypes = {
  query: React.PropTypes.string.isRequired,
  onConfirm: React.PropTypes.func.isRequired,
  onCancel: React.PropTypes.func,
};
