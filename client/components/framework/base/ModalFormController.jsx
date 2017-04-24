import { ModalController } from 'base/ModalController.jsx';


export class ModalFormController extends ModalController {

  constructor(props) {
    super(props);

    this.onSubmit = () => {};
    this.messageCallback = () => {};
    this.submit = this.submit.bind(this);
    this.attachSubmit = this.attachSubmit.bind(this);
    this.close = this.close.bind(this);
  }

  submit(form, messageCallback) {
    this.messageCallback = messageCallback;
    this.onSubmit(form);
  }

  attachSubmit(callback) {
    this.onSubmit = callback;
  }

  close() {
    super.close();
    this.messageCallback({ title: '', content: '', type: 'Success' }, false);
  }
}
