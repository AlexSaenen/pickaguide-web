import alt from 'client/alt';
import FormActions from 'actions/CurrentForm.js';


class CurrentForm {

  constructor() {
    this.fields = {};
    this.bindActions(FormActions);
  }

  onUpdateValue(input) {
    this.fields[input.label] = input.value;
  }

  onFlush() {
    this.fields = {};
  }
}

export default alt.createStore(CurrentForm, 'CurrentForm');
