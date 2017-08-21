import CommentsActions from 'actions/Comments.js';
import CommentAvatarsActions from 'actions/CommentAvatars.js';
import PromiseApi from 'services/PromiseApi.js';
import AvatarApi from 'services/Avatar.js';


export default class CommentsApi {

  static getFrom(advertId) {
    PromiseApi.auth().get(`/proposals/${advertId}/comments`)
      .then((res) => {
        if (res.error) {
          CommentsActions.error(res.error);
        } else {
          CommentsActions.getSuccess(res);
        }
      })
      .catch((err) => {
        CommentsActions.error(err);
      });
  }

  static getAvatars(ids) {
    AvatarApi.getAvatars(ids, [])
      .then(avatars => CommentAvatarsActions.getSuccess.defer(
        ids.map((id, index) => {
          return { id, avatar: avatars[index] };
        })
      ))
      .catch(err => CommentAvatarsActions.error(err));
  }

  static remove(obj) {
    PromiseApi.auth().delete(`/proposals/${obj.advertId}/comments/${obj.id}`)
      .then((res) => {
        if (res.error) {
          CommentsActions.error(res.error);
        } else {
          CommentsActions.getSuccess(res);
        }
      })
      .catch((err) => {
        CommentsActions.error(err);
      });
  }

  static toggleLike(obj) {
    PromiseApi.auth().put(`/proposals/${obj.advertId}/comments/${obj.id}/likes`)
      .then((res) => {
        if (res.error) {
          CommentsActions.error(res.error);
        } else {
          CommentsActions.getSuccess(res);
        }
      })
      .catch((err) => {
        CommentsActions.error(err);
      });
  }

  static create(postObj) {
    PromiseApi.auth().post(`/proposals/${postObj.advertId}/comments`, { post: postObj.post })
      .then((res) => {
        if (res.error) {
          CommentsActions.error(res.error);
        } else {
          CommentsActions.getSuccess(res);
        }
      })
      .catch((err) => {
        CommentsActions.error(err);
      });
  }

}
