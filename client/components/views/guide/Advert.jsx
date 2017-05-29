import React from 'react';

import { StoreObserver } from 'base/StoreObserver.jsx';
import { ModalFormController } from 'base/ModalFormController.jsx';
import { Title } from 'layout/elements/Title.jsx';
import { Text } from 'layout/elements/Text.jsx';
import { CheckMark } from 'layout/elements/CheckMark.jsx';
import { Button } from 'layout/elements/Button.jsx';
import { Picture } from 'layout/elements/Picture.jsx';
import { Layout } from 'layout/containers/Layout.jsx';
import { Panel } from 'layout/containers/Panel.jsx';
import { VisitCreation } from 'modals/VisitCreation.jsx';
import AdvertsStore from 'stores/user/Adverts.js';

import 'scss/views/adverts.scss';


export class Advert extends StoreObserver {

  constructor(props, context) {
    super(props, context, AdvertsStore);

    this.state = { advert: AdvertsStore.getState().specificAdvert };
    this.visitCreationCtrl = new ModalFormController();
  }

  onStore(store) {
    const newState = Object.assign({}, this.state);
    newState.advert = store.specificAdvert;
    this.setState(newState);
  }

  render() {
    const advert = this.state.advert;

    if (advert.photoUrl === undefined) {
      advert.photoUrl = 'http://www.freeiconspng.com/free-images/no-image-icon-23492';
      advert.active = false;
      advert.owner = { profile: {} };
    }

    return (
      <div className="Advert">
        <VisitCreation controller={this.visitCreationCtrl} advertId={advert._id} />
        <Layout layoutStyle="LayoutLight">
          <hr className="Overlay" />

          <Title>{advert.title}</Title>
          <p className="Small Italic">by {advert.owner.displayName}</p>
          <div className="LineContainer Small">
            <CheckMark active={advert.active} />
          </div>
          <Text>{advert.description}</Text>

          <hr className="SpacedDivider" />

          <Panel panelStyle="NoWrap">
            <Picture pictureName="Advert Cover" pictureType="WidthLimited" url={advert.photoUrl} />
          </Panel>

          <hr className="SpacedDivider" />

          <Button
            label="Ask a visit"
            buttonStyle="Auto Blue"
            onCallback={this.visitCreationCtrl.toggle}
          />
        </Layout>
      </div>
    );
  }
}
