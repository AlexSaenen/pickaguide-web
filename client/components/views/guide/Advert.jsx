import React from 'react';

import { browserHistory } from 'react-router';
import { StoreObserver } from 'base/StoreObserver.jsx';
import { ModalFormController } from 'base/ModalFormController.jsx';
import { ModalController } from 'base/ModalController.jsx';
import { QueryModal } from 'modals/QueryModal.jsx';
import { AuthDependent } from 'base/AuthDependent.jsx';
import { Title } from 'layout/elements/Title.jsx';
import { SubTitle } from 'layout/elements/SubTitle.jsx';
import { Text } from 'layout/elements/Text.jsx';
import { Information } from 'layout/elements/Information.jsx';
import { Button } from 'layout/elements/Button.jsx';
import { Picture } from 'layout/elements/Picture.jsx';
import { Comment } from 'layout/user/Comment.jsx';
import { ClickablePicture } from 'layout/user/ClickablePicture.jsx';
import { CreateComment } from 'layout/user/CreateComment.jsx';
import { Layout } from 'layout/containers/Layout.jsx';
import { Panel } from 'layout/containers/Panel.jsx';
import { VisitCreation } from 'modals/VisitCreation.jsx';
import AdvertsStore from 'stores/user/Adverts.js';
import AvatarStore from 'stores/other/Avatar.js';
import CommentsStore from 'stores/user/Comments.js';
import AuthStore from 'stores/user/Auth.js';
import AdvertsActions from 'actions/Adverts.js';
import CommentsActions from 'actions/Comments.js';
import CommentAvatarsActions from 'actions/CommentAvatars.js';
import ProfileActions from 'actions/SearchProfile.js';
import { strings } from './Advert_lang.js'


import 'scss/views/adverts.scss';

export class Advert extends StoreObserver {

  constructor(props, context) {
    super(props, context, [AdvertsStore, CommentsStore, AvatarStore]);

    this.id = this.props.params.id;
    this.state = { advert: undefined, comments: [], avatar: '' };
    this.visitCreationCtrl = new ModalFormController();
    this.deleteCommentCtrl = new ModalController();
  }

  componentWillReceiveProps(nextProps) {
    this.id = nextProps.params.id;
    const nextState = Object.assign({}, this.state);
    nextState.advert = undefined;
    nextState.comments = [];

    this.setState(nextState);

    if (nextState.advert === undefined) {
      AdvertsActions.find(this.id);
    }

    CommentsActions.get(this.id);
  }

  componentDidMount() {
    super.componentDidMount();
    if (this.state.advert === undefined) {
      AdvertsActions.find(this.id);
    }

    if (AuthStore.getState().credentials) {
      CommentsActions.get(this.id);
    }
  }

  onStore(store) {
    const nextState = Object.assign({}, this.state);

    if (store.error) {
      return;
    } else if (store.specificAdvert && store.specificAdvert._id === this.id) {
      nextState.advert = store.specificAdvert;
      this.ownerId = store.specificAdvert.owner._id;
      ProfileActions.get.defer(this.ownerId);
    } else if (store.comments && store.id === this.id) {
      nextState.comments = store.comments;
      const ids = [];
      nextState.comments.forEach((comment) => {
        if (ids.indexOf(comment.owner._id) === -1) {
          ids.push(comment.owner._id);
        }
      });

      if (AuthStore.getState().credentials) {
        CommentAvatarsActions.get.defer(ids);
      }
    } else if (store.avatar) {
      nextState.avatar = store.avatar;
    } else {
      nextState.advert = undefined;
    }

    this.setState(nextState);
  }

  render() {
    const advert = this.state.advert;
    const comments = this.state.comments;

    if (advert === undefined || advert === null) {
      return (
        <Layout layoutStyle="LayoutBlank">
          <Text>{strings.noAdvert}</Text>
        </Layout>
      );
    }

    return (
      <div className="Advert">
        <VisitCreation controller={this.visitCreationCtrl} advertId={advert._id} />
        <QueryModal
          controller={this.deleteCommentCtrl}
          query={strings.suppressComment}
          onConfirm={
            function confirm() {
              CommentsActions.remove({ id: this.deleteCommentCtrl.callerId, advertId: this.deleteCommentCtrl.advertId });
            }.bind(this)
          }
        />

        <Layout layoutStyle="LayoutLight">
          <hr className="Overlay" />

          {
            advert.rate !== undefined &&
              <div className="star-ratings-css LineSpaced Margin">
                <div className="star-ratings-css-top" style={{ width: `${advert.rate * 20}%` }}><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
                <div className="star-ratings-css-bottom"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
              </div>
          }
          <Title>{advert.title}</Title>
          <ClickablePicture
            url={this.state.avatar}
            pictureType="HeightLimited"
            onClick={
              function goToProfile() {
                browserHistory.push(`/profiles/${this.ownerId}`);
              }.bind(this)
            }
          />

          <p className="Small Italic Inline LineSpaced">{strings.by}</p>
          <p className="Small Bold Inline">{advert.owner.displayName}</p>
          <p className="Small Italic Inline">{strings.in}</p>
          <p className="Small Bold Inline">{advert.city}, {advert.country}</p>

          <br /><br />
          <Text>{advert.description}</Text>

          <hr className="SpacedDivider" />

          <Panel panelStyle="NoWrap">
            <Picture pictureName="Advert Cover" pictureType="WidthLimited" url={advert.photoUrl} />
          </Panel>

          <AuthDependent auth>
            {
              AuthStore.getState().credentials && AuthStore.getState().credentials.id !== advert.owner._id &&
                <div>
                  <hr className="SpacedDivider" />
                  <Button
                    label={strings.askVisit}
                    buttonStyle="Auto Blue"
                    onCallback={this.visitCreationCtrl.toggle}
                  />
                </div>
            }
          </AuthDependent>

          <AuthDependent unauth>
            <Information infoStyle="Info Small LineSpaced">{strings.needLog}</Information>
          </AuthDependent>

          <hr className="SpacedOverlay" />

          <AuthDependent auth>
            {
              comments.length !== 0 &&
                <SubTitle>{strings.commentTitle}</SubTitle>
            }

            {
              comments.map((comment, index) => {
                return (
                  <div key={index}>
                    <Comment {...comment} deleter={this.deleteCommentCtrl} advertId={this.id} />
                  </div>
                );
              })
            }
            <CreateComment advertId={this.id} />
          </AuthDependent>
        </Layout>
      </div>
    );
  }
}
