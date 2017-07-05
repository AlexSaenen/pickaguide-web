import { ModalController } from 'base/ModalController.jsx';


export class ModalFormController extends ModalController {

  constructor(props) {
    super(props);

    this.onSubmit = () => {};
    this.messageCallback = () => {};
    this.submit = this.submit.bind(this);
    this.attachSubmit = this.attachSubmit.bind(this);
    this.attachClose = this.attachClose.bind(this);
    this._invalidateInputs = this._invalidateInputs.bind(this);
    this.reset = this.reset.bind(this);
    this.closeAndReset = this.closeAndReset.bind(this);
    this.toggle = this.toggle.bind(this);
    this.submittedInputs = null;
    this.onClose = (view) => {
      this.reset(view);
    };
  }

  submit(form, messageCallback, inputs) {
    this.messageCallback = messageCallback;
    this.submittedInputs = inputs;
    this.onSubmit(form);
  }

  attachSubmit(callback) {
    this.onSubmit = callback;
  }

  attachClose(callback) {
    this.onClose = (view) => {
      this.reset(view);
      callback();
    };
  }

  _invalidateInputs(inputs) {
    inputs.forEach((input) => {
      if (input.type !== 'submit') {
        input.value = '';
      }
    });
  }

  closeAndReset() {
    if (this.submittedInputs) {
      this._invalidateInputs(this.submittedInputs);
    }

    super.close();
    this.messageCallback({ title: '', content: '', type: 'Success' }, false);
  }

  reset(form) {
    const inputs = form.querySelectorAll('input, textarea');
    this._invalidateInputs(inputs);
  }
}
