import React from 'react';

import { StoreObserver } from 'base/StoreObserver.jsx';
import { ModalFormController } from 'base/ModalFormController.jsx';
import { ModalController } from 'base/ModalController.jsx';
import { QueryModal } from 'modals/QueryModal.jsx';
import { AuthDependent } from 'base/AuthDependent.jsx';
import { Title } from 'layout/elements/Title.jsx';
import { SubTitle } from 'layout/elements/SubTitle.jsx';
import { Text } from 'layout/elements/Text.jsx';
import { CheckMark } from 'layout/elements/CheckMark.jsx';
import { Button } from 'layout/elements/Button.jsx';
import { Picture } from 'layout/elements/Picture.jsx';
import { Comment } from 'layout/user/Comment.jsx';
import { CreateComment } from 'layout/user/CreateComment.jsx';
import { Layout } from 'layout/containers/Layout.jsx';
import { Panel } from 'layout/containers/Panel.jsx';
import { VisitCreation } from 'modals/VisitCreation.jsx';
import AdvertsStore from 'stores/user/Adverts.js';
import CommentsStore from 'stores/user/Comments.js';
import AdvertsActions from 'actions/Adverts.js';
import CommentsActions from 'actions/Comments.js';
import CommentAvatarsActions from 'actions/CommentAvatars.js';

import 'scss/views/adverts.scss';

const getCache = (advertId) => {
  const storeCache = AdvertsStore.getState().specificAdvert;

  return (storeCache && storeCache._id === advertId ? storeCache : undefined);
};

const getCommentsCache = (advertId) => {
  const storeCache = CommentsStore.getState();

  return (storeCache.id === advertId ? storeCache.comments : []);
};


export class Advert extends StoreObserver {

  constructor(props, context) {
    super(props, context, [AdvertsStore, CommentsStore]);

    this.id = this.props.params.id;
    this.state = { advert: getCache(this.id), comments: getCommentsCache(this.id) };
    this.visitCreationCtrl = new ModalFormController();
    this.deleteCommentCtrl = new ModalController();
  }

  componentWillReceiveProps(nextProps) {
    this.id = nextProps.params.id;
    const nextState = Object.assign({}, this.state);
    nextState.advert = getCache(this.id);
    nextState.comments = getCommentsCache(this.id);

    this.setState(nextState);

    if (nextState.advert === undefined) {
      AdvertsActions.find(this.id);
      CommentsActions.get(this.id);
    }
  }

  componentDidMount() {
    super.componentDidMount();
    if (this.state.advert === undefined) {
      AdvertsActions.find(this.id);
      CommentsActions.get(this.id);
    }
  }

  onStore(store) {
    const nextState = Object.assign({}, this.state);

    if (store.error) {
      return;
    } else if (store.specificAdvert && store.specificAdvert._id === this.id) {
      nextState.advert = store.specificAdvert;
    } else if (store.comments && store.id === this.id) {
      nextState.comments = getCommentsCache(this.id);
      const ids = [];
      nextState.comments.forEach((comment) => {
        if (ids.indexOf(comment.owner._id) === -1) {
          ids.push(comment.owner._id);
        }
      });

      CommentAvatarsActions.get.defer(ids);
    } else {
      nextState.advert = getCache(this.id);
    }

    this.setState(nextState);
  }

  render() {
    const advert = this.state.advert;
    const comments = this.state.comments;

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
        <QueryModal
          controller={this.deleteCommentCtrl}
          query="Do you really wish to delete this comment ?"
          onConfirm={
            function confirm() {
              CommentsActions.remove({ id: this.deleteCommentCtrl.callerId, advertId: this.deleteCommentCtrl.advertId });
            }.bind(this)
          }
        />
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

          <AuthDependent auth>
            {
              comments.length !== 0 &&
                <div>
                  <hr className="SpacedOverlay" />
                  <SubTitle>Comments</SubTitle>
                </div>
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
