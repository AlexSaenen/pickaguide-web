import React from 'react';

import { PropsComponent } from 'base/PropsComponent.jsx';
import { LinkModal } from 'modals/LinkModal.jsx';


export class EditAdvertCover extends PropsComponent {

  constructor(props, context) {
    super(props, context);

    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.props.onClose('cover');
  }

  render() {
    return (
      <LinkModal
        {...this.props}
        onClose={this.handleClose}
        layoutStyle="LayoutLight Tight"
        title="Edit Advert Cover"
        inputHolder="New URL"
        inputLabel="photoUrl"
      />
    );
  }
}

EditAdvertCover.propTypes = {
  onSubmit: React.PropTypes.func.isRequired,
  onClose: React.PropTypes.func.isRequired,
};
