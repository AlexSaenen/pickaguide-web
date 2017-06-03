import { ModalFormController } from 'base/ModalFormController.jsx';


export class FeedableModalFormController extends ModalFormController {

  constructor() {
    super();

    this.onFeed = () => {};
    this.feed = this.feed.bind(this);
    this.attachFeeder = this.attachFeeder.bind(this);
  }

  feed(set) {
    this.onFeed(set);
  }

  attachFeeder(callback) {
    this.onFeed = callback;
  }
}
