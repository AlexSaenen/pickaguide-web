import { browserHistory } from 'react-router';

import AuthStore from 'stores/user/Auth.js';
import BlockStore from 'stores/user/Block.js';
import UserStore from 'stores/user/User.js';

const goBackOrHome = (action) => {
  if (action) {
    browserHistory.goBack();
  } else {
    browserHistory.push('/');
  }
};

const goReview = () => { browserHistory.push('/visits/review'); };
const goLogin = () => { browserHistory.push('/login'); };

const connected = () => { return AuthStore.getState().credentials !== null; };
const blocked = () => { return BlockStore.getState().isBlocking === true; };
const guide = () => { return UserStore.getState().isGuide === true; };
const reloadVisitReview = (location) => { return location.action === 'POP'; };

const notForConnected = {
  routes: [new RegExp(/^\/signup$/), new RegExp(/^\/login$/)],
  on: goBackOrHome,
  when: connected,
  not: true,
};

const onlyForConnected = {
  routes: [
    new RegExp(/^\/(profiles|accounts)\/mine\/(edit)?$/),
    new RegExp(/^\/guide\/(become|adverts)$/),
    new RegExp(/^\/guide\/adverts\/[a-z0-9]{24}$/),
    new RegExp(/^\/guide\/adverts\/mine\/[a-z0-9]{24}$/),
    new RegExp(/^\/visits$/),
    new RegExp(/^\/visits\/review$/),
    new RegExp(/^\/visits\/[a-z0-9]{24}\/review$/),
    new RegExp(/^\/visits\/mine\/[a-z]+\/[a-z0-9]{24}$/),
  ],
  on: goLogin,
  when: connected,
  not: false,
};

const notForReviewing = {
  routes: [
    new RegExp(/^\/visits\/[a-z0-9]{24}\/review$/),
  ],
  on: goReview,
  when: reloadVisitReview,
  not: true,
};

const notForBlocked = {
  routes: [
    new RegExp(/^\/(profiles|accounts)\/mine\/(edit)?$/),
    new RegExp(/^\/guide\/(become|adverts)$/),
    new RegExp(/^\/guide\/adverts\/[a-z0-9]{24}$/),
    new RegExp(/^\/guide\/adverts\/mine\/[a-z0-9]{24}$/),
    new RegExp(/^\/visits$/),
    new RegExp(/^\/visits\/mine\/[a-z]+\/[a-z0-9]{24}$/),
    new RegExp(/^\/signup$/),
    new RegExp(/^\/login$/),
  ],
  on: goReview,
  when: blocked,
  not: true,
};

const onlyForGuides = {
  routes: [
    new RegExp(/^\/guide\/adverts$/),
    new RegExp(/^\/guide\/adverts\/mine\/[a-z0-9]{24}$/),
  ],
  on: goBackOrHome,
  when: guide,
  not: false,
};

const blockingRoutes = { notForConnected, onlyForConnected, notForBlocked, onlyForGuides, notForReviewing };

export default (location) => {
  const routeCheckers = Object.keys(blockingRoutes);

  routeCheckers.some((checkerType) => {
    const checker = blockingRoutes[checkerType];
    if (checker.routes.reduce((a, b) => a || RegExp(b).test(location.pathname), false) === true) {
      if (!(checker.not ^ checker.when(location))) {
        checker.on(location.action);
        return true;
      }
    }

    return false;
  });
};
