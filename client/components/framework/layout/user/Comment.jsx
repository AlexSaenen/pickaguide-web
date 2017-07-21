import React from 'react';
import { browserHistory } from 'react-router';

import { StoreObserver } from 'base/StoreObserver.jsx';
import { ClickablePicture } from 'layout/user/ClickablePicture.jsx';
import DeleteAction from 'layout/user/DeleteAction.jsx';
import CommentAvatarsStore from 'stores/user/CommentAvatars.js';
import AuthStore from 'stores/user/Auth.js';

import 'scss/framework/comment.scss';


export class Comment extends StoreObserver {

  constructor(props, context) {
    super(props, context, CommentAvatarsStore);

    this.onDelete = this.onDelete.bind(this);
    this.id = props._id;
    this.advertId = props.advertId;
    this.userId = props.owner._id;
    this.state = props;
    this.navigateToProfile = this.navigateToProfile.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.id = nextProps._id;
    this.advertId = nextProps.advertId;
    this.userId = nextProps.owner._id;
    const nextState = nextProps;
    this.setState(nextState);
  }

  navigateToProfile() {
    browserHistory.push(`/profiles/${this.userId}`);
  }

  onDelete(clickEvent) {
    clickEvent.stopPropagation();
    this.props.deleter.callerId = this.id;
    this.props.deleter.advertId = this.advertId;
    this.props.deleter.toggle(true);
  }

  onStore(store) {
    const nextState = Object.assign({}, this.state);

    if (store.error) {
      nextState.owner.avatar = '';
    } else {
      const newAvatar = store.avatars.find(avatarObj => avatarObj.id === this.userId);
      nextState.owner.avatar = (newAvatar && newAvatar.avatar ? newAvatar.avatar : '');
    }

    this.setState(nextState);
  }

  render() {
    const credentials = AuthStore.getState().credentials;
    const myId = credentials ? credentials.id : null;

    return (
      <div className="Comment">
        {
          myId && this.state.owner._id === myId &&
            <DeleteAction onClick={this.onDelete} />
        }
        <div className="CommentContent">
          <div>
            {
              this.state.owner.avatar &&
                <ClickablePicture
                  url={this.state.owner.avatar}
                  pictureName={this.state.owner.displayName}
                  onClick={this.navigateToProfile}
                />
            }
          </div>
          <div className="Post LineSpaced">{this.state.post}</div>
        </div>
        <div className="CommentMeta">
          <p className="Italic Inline">Posted on </p>
          <p className="Bold Inline">{new Date(this.state.date).toDateString()}</p>
          <p className="Italic Inline"> at </p>
          <p className="Bold Inline">{new Date(this.state.date).toLocaleTimeString()}</p>
        </div>
      </div>
    );
  }
}

/* <p className="Italic Inline"> with </p>
<p className="Bold Inline">{this.state.like}</p>
<p className="Italic Inline"> {this.state.like === 1 ? 'like' : 'likes'}</p> */

Comment.propTypes = {
  _id: React.PropTypes.string.isRequired,
  date: React.PropTypes.string.isRequired,
  post: React.PropTypes.string.isRequired,
  like: React.PropTypes.number.isRequired,
};
