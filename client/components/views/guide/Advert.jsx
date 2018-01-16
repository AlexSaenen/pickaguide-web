import React from 'react';
import { Link } from 'react-router';

import { StoreObserver } from 'base/StoreObserver.jsx';
import { ModalFormController } from 'base/ModalFormController.jsx';
import { ModalController } from 'base/ModalController.jsx';
import { QueryModal } from 'modals/QueryModal.jsx';
import { ImageModal } from 'modals/ImageModal.jsx';
import { AuthDependent } from 'base/AuthDependent.jsx';
import { Information } from 'layout/elements/Information.jsx';
import { Button } from 'layout/elements/Button.jsx';
import { Picture } from 'layout/elements/Picture.jsx';
import { ClickablePicture } from 'layout/user/ClickablePicture.jsx';
import { List } from 'layout/list/List.jsx';
import { Element } from 'layout/list/Element.jsx';
import { Comment } from 'layout/user/Comment.jsx';
import { CreateComment } from 'layout/user/CreateComment.jsx';
import { Layout } from 'layout/containers/Layout.jsx';
import { Loader } from 'layout/elements/Loader.jsx';
import { VisitCreation } from 'modals/VisitCreation.jsx';
import AdvertMap from 'layout/user/AdvertMap.jsx';
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
    this.state = { advert: undefined, comments: [], avatar: '', fullImage: '' };
    this.visitCreationCtrl = new ModalFormController();
    this.deleteCommentCtrl = new ModalController();
    this.fullImageCtrl = new ModalController();
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

  openImageFull(fullImage) {
    this.setState({ fullImage });
    this.fullImageCtrl.toggle(true);
  }

  render() {
    const advert = this.state.advert;
    const comments = this.state.comments;

    if (advert === undefined || advert === null) {
      return (
        <Layout layoutStyle="LayoutBlank">
          <Loader />
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

        <ImageModal
          modalStyle="Auto"
          image={this.state.fullImage}
          controller={this.fullImageCtrl}
        />

        <Layout layoutStyle="LayoutBlank">
          <p className="HeaderText Title Inline-Block" >{advert.title}</p>
          {
            !!advert.rate &&
              <div className="star-ratings-css Vertical Margin">
                <div className="star-ratings-css-top" style={{ width: `${advert.rate * 20}%` }}><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
                <div className="star-ratings-css-bottom"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
              </div>
          }
          <AuthDependent auth>
            {
              AuthStore.getState().credentials && AuthStore.getState().credentials.id !== advert.owner._id &&
                <Button
                  label="Ask a visit"
                  buttonStyle="Auto Blue"
                  onCallback={this.visitCreationCtrl.toggle}
                />
            }
          </AuthDependent>
        </Layout>

        <Layout layoutStyle="LayoutBlank">
          <hr className="Overlay" />

          <List listStyle="ListGrid" elementStyle="Auto Transparent NoWrap Vertical Box">
            <Layout layoutStyle="SoftShadowNonHover">
              <div className="LayoutHeader">
                <div className="HeaderPicture Inline-Block"><Picture url={this.state.avatar} pictureName="Profile" radius /></div>
                <p className="Small Italic Inline LineSpaced">by </p>
                <p className="Small Bold Inline LinkColor"><Link to={`/profiles/${this.ownerId}`}>{advert.owner.displayName}</Link></p>
                <p className="Small Italic Inline"> in </p>
                <p className="Small Bold Inline">{advert.city}, {advert.country}</p>
              </div>
            </Layout>

            <Layout layoutStyle="SoftShadowNonHover">
              <p className="LineSpaced">{advert.description}</p>
            </Layout>
          </List>

          <Layout layoutStyle="W80 NoWrap MarginAuto">
            <Element elementStyle="W50 NoWrap PaddingOne Box Inline-Block Vertical">
              <Element elementStyle="WidthFull Height20 NoWrap OverflowHidden Inline-Block SoftShadow">
                <AdvertMap zoom={12} location={advert.location} city={advert.city} country={advert.country} />
              </Element>
            </Element>
          </Layout>

          <List listStyle="ListGrid" elementStyle="Tight MW30 Vertical">
            {
              advert.images.map((image, index) =>
                <ClickablePicture
                  key={index}
                  pictureName="Advert images"
                  pictureType="WidthLimited"
                  full
                  url={image}
                  onClick={this.openImageFull.bind(this, image)}
                />)
            }
          </List>

          <AuthDependent unauth>
            <Information infoStyle="Info Small LineSpaced">{strings.needLog}</Information>
          </AuthDependent>

          <AuthDependent auth>
            <hr className="SpacedOverlay" />

            <CreateComment advertId={this.id} />
            {
              <Layout layoutStyle="W80 MarginAuto">
                <List listStyle="ListGrid WidthFull" elementStyle="Transparent">
                  {
                    comments.map((comment, index) => {
                      return (
                        <div key={index}>
                          <Comment {...comment} deleter={this.deleteCommentCtrl} advertId={this.id} />
                        </div>
                      );
                    })
                  }
                </List>
              </Layout>
            }
          </AuthDependent>
        </Layout>
      </div>
    );
  }
}
