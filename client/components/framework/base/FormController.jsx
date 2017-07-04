import { Controller } from 'base/Controller.jsx';


export class FormController extends Controller {

  constructor() {
    super();

    this.onSubmit = () => {};
    this.messageCallback = () => {};
    this.submit = this.submit.bind(this);
    this.reset = this.reset.bind(this);
    this.attachSubmit = this.attachSubmit.bind(this);
  }

  submit(form, messageCallback) {
    this.messageCallback = messageCallback;
    this.onSubmit(form);
  }

  attachSubmit(callback) {
    this.onSubmit = callback;
  }

  reset(form) {
    form
    .querySelectorAll('input, textarea')
    .forEach((input) => {
      if (input.type !== 'submit') {
        input.value = '';
      }
    });
  }
}
