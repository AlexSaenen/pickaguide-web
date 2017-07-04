import { ModalController } from 'base/ModalController.jsx';


export class ModalFormController extends ModalController {

  constructor(props) {
    super(props);

    this.onSubmit = () => {};
    this.messageCallback = () => {};
    this.submit = this.submit.bind(this);
    this.attachSubmit = this.attachSubmit.bind(this);
    this._invalidateForm = this._invalidateForm.bind(this);
    this.closeAndReset = this.closeAndReset.bind(this);
    this.toggle = this.toggle.bind(this);
    this.autoClear = (props && props.autoClear !== undefined ? props.autoClear : true);
    this.submittedInputs = null;
  }

  submit(form, messageCallback, inputs) {
    this.messageCallback = messageCallback;
    this.submittedInputs = inputs;
    this.onSubmit(form);
  }

  attachSubmit(callback) {
    this.onSubmit = callback;
  }

  _invalidateForm() {
    if (this.autoClear) {
      super.reset();
    }
  }

  closeAndReset() {
    super.close();
    this._invalidateForm();
    this.messageCallback({ title: '', content: '', type: 'Success' }, false);
  }
}
