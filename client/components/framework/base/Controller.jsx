import React from 'react';


export class Controller extends React.Component {

  constructor() {
    super();

    this._view = null;
    this.attachView = this.attachView.bind(this);
    this.attachState = this.attachState.bind(this);
  }

  attachView(view) {
    if (this._view === null) {
      this._view = view;
    }

    return this;
  }

  attachState(state) {
    if (this._view !== null) {
      this._view.state = state;
    } else {
      this._view = { state };
    }
  }
}
