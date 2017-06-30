import React from 'react';
import { browserHistory } from 'react-router';

import { StoreObserver } from 'base/StoreObserver.jsx';
import { ClickablePicture } from 'layout/user/ClickablePicture.jsx';
import { Layout } from 'layout/containers/Layout.jsx';
import { Panel } from 'layout/containers/Panel.jsx';
import { Button } from 'layout/elements/Button.jsx';
import { Picture } from 'layout/elements/Picture.jsx';
import { Text } from 'layout/elements/Text.jsx';
import { Title } from 'layout/elements/Title.jsx';
import { SubTitle } from 'layout/elements/SubTitle.jsx';
import { FeedableModalFormController } from 'base/FeedableModalFormController.jsx';
import { ChangeStatus } from 'modals/ChangeStatus.jsx';
import { Information } from 'layout/elements/Information.jsx';
import VisitsStore from 'stores/user/Visits.js';
import VisitsActions from 'actions/Visits.js';

const getCache = (visitId) => {
  const storeCache = VisitsStore.getState().specificVisit;

  return (storeCache && storeCache._id === visitId ? storeCache : undefined);
};

const getStatusMapping = (type) => {
  return (type === 'visitor' ? {
    waiting: ['cancel'],
    accepted: ['cancel'],
  } : {
    waiting: ['accept', 'deny'],
    accepted: ['finish', 'deny'],
  });
};


export class OwnerVisit extends StoreObserver {

  constructor(props, context) {
    super(props, context, VisitsStore);

    this.id = this.props.params.id;
    this.type = this.props.params.type;
    this.statusMapping = getStatusMapping(this.type);
    this.ctrl = new FeedableModalFormController();
    this.state = { visit: getCache(this.id) };
    this.goToAdvert = this.goToAdvert.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.id = nextProps.params.id;
    this.type = nextProps.params.type;
    this.statusMapping = getStatusMapping(this.type);
    const nextState = Object.assign({}, this.state);
    nextState.visit = getCache(this.id);

    this.setState(nextState);

    if (nextState.visit === undefined) {
      VisitsActions.find({ visitId: this.id, mine: true, type: this.type });
    }
  }

  componentDidMount() {
    super.componentDidMount();
    if (this.state.visit === undefined) {
      VisitsActions.find({ visitId: this.id, mine: true, type: this.type });
    }
  }

  onStore(store) {
    const nextState = Object.assign({}, this.state);

    if (store.error) {
      return;
    } else if (store.specificVisit && store.specificVisit._id === this.id) {
      nextState.visit = store.specificVisit;
    } else {
      nextState.visit = getCache(this.id);
    }

    this.setState(nextState);
  }

  goToAdvert() {
    browserHistory.push(`/guide/adverts/${this.type === 'guide' ? 'mine/' : ''}${this.state.visit.about._id}`);
  }

  render() {
    const visit = this.state.visit;

    if (visit === undefined || visit === null) {
      return (
        <Layout layoutStyle="LayoutBlank">
          <Text>No such visit found</Text>
        </Layout>
      );
    }

    console.log(visit);

    const visitStatus = visit.status.slice(-1)[0].label;
    const whenDate = new Date(visit.when).toDateString();

    let changeStatus = null;

    if (this.statusMapping[visitStatus] !== undefined && visit.about) {
      changeStatus = this.statusMapping[visitStatus].map((nextStatus, index) => {
        return (
          <Button
            buttonStyle="Blue Auto AllSpaced"
            label={nextStatus.capitalize()}
            key={index}
            onCallback={
              function callback() {
                this.ctrl.feed({ callerId: this.id, actionType: nextStatus });
                this.ctrl.toggle(true);
              }.bind(this)
            }
          />
        );
      });

      changeStatus = (
        <div><hr className="SpacedDivider" />{changeStatus}</div>
      );
    }

    return (
      <Layout layoutStyle="LayoutLight">
        <hr className="Overlay" />

        {
          visit.about === null &&
            <Information infoStyle="Alert Small MarginAuto">The advert doesn't exist anymore</Information>
        }


        <Title>{visit.about ? visit.about.title : 'Title not available'}</Title>
        <p className="Small Italic Inline">with </p>
        <p className="Small Bold Inline">{visit.with}</p>
        {
          visit.about &&
            <p className="Small Italic"> for more information about the advert, click on the picture below</p>
        }

        <br />
        <Button buttonStyle="Auto TextWhite Bold LineSpaced" onCallback={browserHistory.goBack} label="Back" />

        <Panel panelStyle={`LessSpaced ${visit.about ? '' : 'Small'}`}>
          <Layout layoutStyle="NoWrap">
            {
              visit.about ?
                <ClickablePicture url={visit.about.photoUrl} pictureName="Advert Cover" pictureType="WidthLimited" full onClick={this.goToAdvert} />
                :
                <Picture url="https://d30y9cdsu7xlg0.cloudfront.net/png/275465-200.png" pictureName="Deleted advert" pictureType="WidthLimited" full />
            }
          </Layout>
        </Panel>

        <hr className="SpacedDivider" />

        <p className="Inline">The visit {whenDate >= new Date().toDateString() ? 'is' : 'was'} on </p>
        <p className="Bold Inline">{whenDate}</p>
        <p className="Inline"> and created on </p>
        <p className="Bold Inline">{new Date(visit.creationDate).toDateString()}</p>

        <br />

        <p className="Inline">with </p>
        <p className="Bold Inline">{String(visit.numberVisitors)}</p>
        <p className="Inline"> {visit.numberVisitors > 1 ? 'visitors' : 'visitor'}</p>

        {
          visit.special ?
            <div className="Inline">
              <p className="Inline"> and a special request stating: "</p>
              <p className="Bold Inline">{visit.special}</p>
              <p className="Inline">"</p>
            </div>
            :
            <p className="Inline"> and no special request</p>
        }

        <br /><br /><br />
        <SubTitle>Status history</SubTitle>

        {
          visit.status.map((state, index) => {
            return (
              <div key={index}>
                <p className="Inline">On </p>
                <p className="Bold Inline">{new Date(state.date).toDateString()}</p>
                <p className="Inline"> to </p>
                <p
                  className={
                    `Bold Inline OverflowHidden TextOverflow
                    ${['denied', 'cancelled'].indexOf(state.label) !== -1 ? 'Red' : ''}
                    ${state.label === 'finished' ? 'Green' : ''}
                    ${state.label === 'accepted' ? 'Blue' : ''}`
                  }
                >{state.label}</p>
                <p className="Inline"> because </p>
                <p className="Bold Inline">{state.message}</p>
              </div>
            );
          })
        }

        {changeStatus}

        <ChangeStatus controller={this.ctrl} />
      </Layout>
    );
  }
}

OwnerVisit.propTypes = {
  params: React.PropTypes.object,
};
