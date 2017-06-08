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
import AdvertsActions from 'actions/Adverts.js';

import 'scss/views/adverts.scss';

const getCache = (advertId) => {
  const storeCache = AdvertsStore.getState().specificAdvert;

  return (storeCache && storeCache._id === advertId ? storeCache : undefined);
};


export class Advert extends StoreObserver {

  constructor(props, context) {
    super(props, context, AdvertsStore);

    this.id = this.props.params.id;
    this.state = { advert: getCache(this.id) };
    this.visitCreationCtrl = new ModalFormController();
  }

  componentWillReceiveProps(nextProps) {
    this.id = nextProps.params.id;
    const nextState = Object.assign({}, this.state);
    nextState.advert = getCache(this.id);

    this.setState(nextState);

    if (nextState.advert === undefined) {
      AdvertsActions.find(this.id);
    }
  }

  componentDidMount() {
    super.componentDidMount();
    if (this.state.advert === undefined) {
      AdvertsActions.find(this.id);
    }
  }

  onStore(store) {
    const nextState = Object.assign({}, this.state);

    if (store.error) {
      return;
    } else if (store.specificAdvert && store.specificAdvert._id === this.id) {
      nextState.advert = store.specificAdvert;
    } else {
      nextState.advert = getCache(this.id);
    }

    this.setState(nextState);
  }

  render() {
    const advert = this.state.advert;

    if (advert === undefined || advert === null) {
      return (
        <Layout layoutStyle="LayoutBlank">
          <Text>No such advert found</Text>
        </Layout>
      );
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
