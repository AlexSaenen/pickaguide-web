import React from 'react';

import { PropsComponent } from 'base/PropsComponent.jsx';
import { LinkModal } from 'modals/LinkModal.jsx';


export class EditAdvertCover extends PropsComponent {

  render() {
    return (
      <LinkModal
        {...this.props}
        layoutStyle="LayoutLight Tight"
        title="Edit Advert Cover"
        inputHolder="New URL"
        inputLabel="photoUrl"
      />
    );
  }
}
