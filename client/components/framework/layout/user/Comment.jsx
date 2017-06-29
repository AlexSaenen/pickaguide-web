import React from 'react';
import { browserHistory } from 'react-router';

import { StoreObserver } from 'base/StoreObserver.jsx';
import { ClickablePicture } from 'layout/user/ClickablePicture.jsx';
import CommentAvatarsStore from 'stores/user/CommentAvatars.js';

import 'scss/framework/comment.scss';

const defaultAvatarUrl = 'https://www.learnmine.com/assets/img/medium-default-avatar.png';


export class Comment extends StoreObserver {

  constructor(props, context) {
    super(props, context, CommentAvatarsStore);

    this.id = props._id;
    this.userId = props.owner._id;
    this.state = props;
    this.navigateToProfile = this.navigateToProfile.bind(this);
  }

  navigateToProfile() {
    browserHistory.push(`/profiles/${this.userId}`);
  }

  onStore(store) {
    const nextState = Object.assign({}, this.state);

    if (store.error) {
      nextState.owner.avatar = defaultAvatarUrl;
    } else {
      const newAvatar = store.avatars.find(avatarObj => avatarObj.userId === this.userId);
      nextState.owner.avatar = (newAvatar && newAvatar.avatar ? newAvatar.avatar : defaultAvatarUrl);
    }

    this.setState(nextState);
  }

  render() {
    return (
      <div className="Comment">
        <div className="CommentContent">
          {
            this.state.owner.avatar &&
              <ClickablePicture
                url={this.state.owner.avatar}
                pictureName={this.state.owner.displayName}
                onClick={this.navigateToProfile}
              />
          }
          <div className="Post">{this.state.post}</div>
        </div>
        <div className="CommentMeta">
          <p className="Italic Inline">Posted on </p>
          <p className="Bold Inline">{new Date(this.state.date).toDateString()}</p>
          <p className="Italic Inline"> at </p>
          <p className="Bold Inline">{new Date(this.state.date).toLocaleTimeString()}</p>
          <p className="Italic Inline"> with </p>
          <p className="Bold Inline">{this.state.like}</p>
          <p className="Italic Inline"> {this.state.like === 1 ? 'like' : 'likes'}</p>
        </div>
      </div>
    );
  }
}

Comment.propTypes = {
  _id: React.PropTypes.string.isRequired,
  date: React.PropTypes.string.isRequired,
  post: React.PropTypes.string.isRequired,
  like: React.PropTypes.number.isRequired,
};
