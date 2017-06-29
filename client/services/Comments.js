import CommentsActions from 'actions/Comments.js';
import CommentAvatarsActions from 'actions/CommentAvatars.js';
import PromiseApi from 'services/PromiseApi.js';


export default class CommentsApi {

  static getFrom(advertId) {
    PromiseApi.get(`/public/proposals/${advertId}/comments`)
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

  static getAvatars(userIds) {
    const avatars = [];

    Promise
      .all(userIds.map((userId) => {
        return new Promise((resolve, reject) => {
          PromiseApi.download(`/public/profiles/${userId}/avatar`)
            .then((avatar) => {
              avatars.push({ userId, avatar });
              resolve();
            })
            .catch(err => reject(err));
        });
      }))
      .then(() => {
        CommentAvatarsActions.getSuccess(avatars);
      })
      .catch((err) => {
        CommentAvatarsActions.error(err);
      });
  }
}
