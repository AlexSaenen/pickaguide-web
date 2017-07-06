import { ModalController } from 'base/ModalController.jsx';


export class ModalFormController extends ModalController {

  constructor(props) {
    super(props);

    this.onSubmit = () => {};
    this.messageCallback = () => {};
    this.submit = this.submit.bind(this);
    this.attachSubmit = this.attachSubmit.bind(this);
    this.attachClose = this.attachClose.bind(this);
    this.closeAndReset = this.closeAndReset.bind(this);
    this.toggle = this.toggle.bind(this);
    this.target = null;

    this.onClose = (target) => {
      if (target) {
        if (target.form) {
          target.form.reset();
        } else {
          target.parentNode.parentNode.querySelectorAll('.FormWrapper').forEach(form => form.reset());
        }
      }

      this.target = null;
    };
  }

  submit(form, messageCallback, target) {
    this.target = target;
    this.messageCallback = messageCallback;
    this.onSubmit(form);
  }

  attachSubmit(callback) {
    this.onSubmit = callback;
  }

  attachClose(callback) {
    this.onClose = (target) => {
      this.onClose(target);
      callback();
    };
  }

  closeAndReset() {
    super.close(this.target);
    this.messageCallback({ title: '', content: '', type: 'Success' }, false);
  }
}
