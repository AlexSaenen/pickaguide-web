import { Controller } from 'base/Controller.jsx';


export class ModalController extends Controller {

  constructor(props) {
    super();

    this.toggle = this.toggle.bind(this);
    this.close = this.close.bind(this);
    this.attachClose = this.attachClose.bind(this);
    this.attachView = this._overrideViewLoad.bind(this);

    this.onClose = () => {};
    this.defaultActive = props ? props.active : false;
  }

  _overrideViewLoad(view) {
    super.attachView(view);
    this._view.state.active = this.defaultActive;
  }

  toggle(openState) {
    const newState = Object.assign({}, this._view.state);
    newState.active = (openState !== undefined ? openState : !newState.active);
    this._view.setState(newState);
  }

  close() {
    this.toggle(false);
    this.onClose();
  }

  attachClose(callback) {
    this.onClose = callback;
  }
}
