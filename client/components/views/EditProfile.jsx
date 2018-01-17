import React from 'react';

import { Form } from 'layout/form/Form.jsx';
import { Layout } from 'layout/containers/Layout.jsx';
import { TextInput } from 'form/TextInput.jsx';
import { DateInput, nowToInput } from 'form/DateInput.jsx';
import { TextArea } from 'form/TextArea.jsx';
import { StoreObserver } from 'base/StoreObserver.jsx';
import { List } from 'layout/list/List.jsx';
import { Element } from 'layout/list/Element.jsx';
import { Button } from 'layout/elements/Button.jsx';
import { Loader } from 'layout/elements/Loader.jsx';
import { ModalFormController } from 'base/ModalFormController.jsx';
import { Title } from 'layout/elements/Title.jsx';
import { ClickablePicture } from 'layout/user/ClickablePicture.jsx';
import { EditableInterests } from 'layout/user/EditableInterests.jsx';
import { EditPicture } from 'modals/EditPicture.jsx';
import { strings } from './EditProfile_lang.js';
import ProfileActions from 'actions/Profile.js';
import AvatarActions from 'actions/Avatar.js';
import ProfileStore from 'stores/user/Profile.js';
import AvatarStore from 'stores/user/Avatar.js';


export class EditProfile extends StoreObserver {

  constructor(props, context) {
    super(props, context, [ProfileStore, AvatarStore]);

    this.state = {
      profile: ProfileStore.getState().profile,
      avatar: AvatarStore.getState().avatar,
    };

    this.editPictureCtrl = new ModalFormController();
    this.onSubmit = this.onSubmit.bind(this);
    this.messageCallback = () => {};
  }

  componentDidMount() {
    super.componentDidMount();
    if (this.state.profile === null) {
      ProfileActions.get();
    }
  }

  onStore(store) {
    const newState = Object.assign({}, this.state);

    if (store.error) {
      this.messageCallback({
        title: String(strings.errorTitle),
        content: String(store.error),
        type: 'Alert',
      });
    } else {
      if (store.profile) {
        newState.profile = store.profile;
      } else {
        newState.avatar = store.avatar;
      }

      this.messageCallback({
        title: String(strings.successTitle),
        content: String(strings.successContent),
        type: 'Success',
      });
    }

    this.setState(newState);
  }

  onSubmit(form, messageCallback) {
    this.messageCallback = messageCallback;
    form.interests = this.interestEditor.state.interests;
    ProfileActions.update(form);
  }

  render() {
    const profile = this.state.profile;
    const avatar = this.state.avatar;

    if (profile === null) {
      return (<Loader />);
    }

    return (
      <div>
        <Layout layoutStyle="LayoutBlank">
          <Title>{strings.title}</Title>
        </Layout>

        <Form onSubmit={this.onSubmit} submitLabel={strings.submit}>
          <hr className="Overlay" />

          <Layout layoutStyle="W70 MarginAuto">
            <List listStyle="ListGrid WidthFull" wrapChildren={false}>
              <Element elementStyle="W30 Transparent NoWrapImportant Top Box">
                <Layout layoutStyle="SoftShadowNonHover MarginOneAndHalf">
                  <ClickablePicture url={avatar} onClick={this.editPictureCtrl.toggle} />
                  {
                    profile.hasAvatar &&
                      <Button
                        buttonStyle="Red Auto"
                        label={strings.remove}
                        onCallback={AvatarActions.remove}
                      />
                  }
                </Layout>

                <Layout layoutStyle="SoftShadowNonHover MarginOneAndHalf">
                  <EditableInterests interests={profile.interests} ref={(el) => { this.interestEditor = el; }} />
                </Layout>
              </Element>

              <Element elementStyle="W60 Transparent NoWrapImportant Top Box">
                <Layout layoutStyle="SoftShadowNonHover MarginOneAndHalf">
                  <DateInput displayLabel={strings.inputBirthdate} value={profile.birthdate} label="birthdate" max={Date.now()} defaultValue={nowToInput()} />
                  <TextInput displayLabel={strings.inputPhone} value={profile.phone || ''} label="phone" />
                  <TextInput displayLabel={strings.inputCity} value={profile.city || ''} label="city" />
                  <TextInput displayLabel={strings.inputCountry} value={profile.country || ''} label="country" />
                  <TextArea displayLabel={strings.inputDescription} value={profile.description || ''} label="description" />
                </Layout>

                <Layout layoutStyle="SoftShadowNonHover MarginOneAndHalf">
                  <TextInput displayLabel={strings.inputFirstName} value={profile.firstName} label="firstName" placeholder={strings.inputFirstName} required />
                  <TextInput displayLabel={strings.inputLastName} value={profile.lastName} label="lastName" placeholder={strings.inputLastName} required />
                </Layout>
              </Element>
            </List>
          </Layout>
        </Form>

        <EditPicture controller={this.editPictureCtrl} />
      </div>
    );
  }
}
