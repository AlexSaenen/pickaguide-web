import React from 'react';

import { PropsComponent } from 'base/PropsComponent.jsx';
import { LinkModal } from 'modals/LinkModal.jsx';
import { strings } from './EditAdvertCover_lang.js';


export class EditAdvertCover extends PropsComponent {

  render() {
    return (
      <LinkModal
        {...this.props}
        layoutStyle="LayoutLight Tight"
        title={strings.title}
        inputHolder={strings.inputHolder}
        inputLabel="photoUrl"
      />
    );
  }
}
