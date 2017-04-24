import React from 'react';

import { PropsComponent } from 'base/PropsComponent.jsx';

import 'scss/framework/layout/user.scss';

export class EditableInterests extends PropsComponent {

  constructor(props, context) {
    super(props, context);

    this.state = { interests: props.interests };
    this.removeInterest = this.removeInterest.bind(this);
    this.onAdd = this.onAdd.bind(this);
  }

  removeInterest(index) {
    const newState = Object.assign({}, this.state);
    if (index >= 0 && index < newState.interests.length) {
      newState.interests.splice(index, 1);
      this.setState(newState);
    }
  }

  onAdd() {
    const editor = document.getElementById('interestEditor');
    const newState = Object.assign({}, this.state);
    newState.interests.splice(0, 0, editor.value);
    editor.value = '';
    this.setState(newState);
  }

  render() {
    const interests = this.state.interests || [];

    return (
      <div className="EditableInterests">
        <div className="Editor">
          <svg width="100%" height="100%" viewBox="0 0 400 400" onClick={this.onAdd}>
            <circle cx="200" cy="200" r="200" fill="#D7D7D7" />
            <circle id="hovered" cx="200" cy="200" fill="#3973BF" />
            <line strokeWidth="25" x1="200" y1="80" x2="200" y2="320" />
            <line strokeWidth="25" x1="80" y1="200" x2="320" y2="200" />
          </svg>
          <input placeholder="Any interest" id="interestEditor" />
        </div>

        {
          interests.length > 0 &&
            interests.map((interest, index) =>
              <div key={index} className="Interest">
                <div
                  className="Header"
                  onClick={
                    function click() {
                      this.removeInterest(index);
                    }.bind(this)
                  }
                >
                  <svg width="100%" height="100%" viewBox="0 0 400 400">
                    <circle cx="200" cy="200" r="140" fill="none" strokeWidth="25" />
                    <polyline points="130,130 270,270" fillOpacity="0" strokeWidth="20" />
                    <polyline points="130,270 270,130" fillOpacity="0" strokeWidth="20" />
                  </svg>
                </div>
                <div className="Content">
                  <p className="OverflowHidden TextOverflow">{interest}</p>
                </div>
              </div>
            )
        }
      </div>
    );
  }
}
