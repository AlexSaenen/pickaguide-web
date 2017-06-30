import CommentsActions from 'actions/Comments.js';
import CommentAvatarsActions from 'actions/CommentAvatars.js';
import PromiseApi from 'services/PromiseApi.js';

const defaultAvatarUrl = 'https://www.learnmine.com/assets/img/medium-default-avatar.png';


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

  static getAvatars(userObjs) {
    const avatars = [];

    Promise
      .all(userObjs.map((userObj) => {
        return new Promise((resolve, reject) => {
          if (userObj.hasAvatar) {
            PromiseApi.download(`/public/profiles/${userObj.id}/avatar`)
              .then((avatar) => {
                avatars.push({ userId: userObj.id, avatar });
                resolve();
              })
              .catch(err => reject(err));
          } else {
            avatars.push({ userId: userObj.id, avatar: defaultAvatarUrl });
            resolve();
          }
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
