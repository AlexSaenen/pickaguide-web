import React from 'react';

import { LinkModal } from 'modals/LinkModal.jsx';


const NewPicture = (props) => {
  return (
    <LinkModal {...props} layoutStyle="LayoutDark Tight" title="New Picture" inputHolder="New URL" />
  );
};

export default NewPicture;
