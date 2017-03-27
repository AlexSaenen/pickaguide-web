import React from 'react';
// import ProfileActions from 'actions/Profile.js';
import ProfileStore from 'stores/user/Profile.js';

import { StoreObserver } from 'base/StoreObserver.jsx';
import { ModalForm } from 'view/ModalForm.jsx';
import { Title } from 'layout/elements/Title.jsx';
import { TextInput } from 'form/TextInput.jsx';
import { TextArea } from 'form/TextArea.jsx';


export class FormGuideModal extends StoreObserver {

  constructor(props, context) {
    super(props, context, ProfileStore);

    this.state = {
      profileInfo: ProfileStore.getState().profile,
      title: props.title,
    };

    this.onStoreChange = this.onStoreChange.bind(this);
  }

  onStoreChange(store) {
    const stateCopy = Object.assign({}, this.state);
    stateCopy.profileInfo = store.profile;
    this.updateState(stateCopy);
  }

  render() {
    const classes = [6];
    classes[0] = this.state.profileInfo.firstName ? 'Hidden' : '';
    classes[1] = this.state.profileInfo.lastName ? 'Hidden' : '';
    classes[2] = this.state.profileInfo.phone ? 'Hidden' : '';
    classes[3] = this.state.profileInfo.city ? 'Hidden' : '';
    classes[4] = this.state.profileInfo.country ? 'Hidden' : '';
    classes[5] = this.state.profileInfo.description ? 'Hidden' : '';

    return (
      <ModalForm {...this.props} modalStyle="Large">
        <Title>{this.state.title}</Title>
        <TextInput className={classes[0]} value={this.state.profileInfo.firstName} label="firstName" placeholder="First name" required />
        <TextInput className={classes[1]} value={this.state.profileInfo.lastName} label="lastName" placeholder="Last name" required />
        <TextInput className={classes[2]} value={this.state.profileInfo.phone} label="phone" />
        <TextInput className={classes[3]} value={this.state.profileInfo.city} label="city" />
        <TextInput className={classes[4]} value={this.state.profileInfo.country} label="country" />
        <TextArea className={classes[5]} value={this.state.profileInfo.description} label="description" />
      </ModalForm>
    );
  }
}

FormGuideModal.defaultProps = {
  title: 'Enter link',
};

FormGuideModal.propTypes = {
  title: React.PropTypes.string,
};
