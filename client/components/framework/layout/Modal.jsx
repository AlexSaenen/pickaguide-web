import React from 'react';

import { Button } from 'layout/Button.jsx';
import { PropsComponent } from 'base/PropsComponent.jsx';

import 'scss/framework/modal.scss';
import 'scss/framework/layout.scss';


export class Modal extends PropsComponent {

  constructor(props, context) {
    super(props, context);

    this.state = {
      modalStyle: props.modalStyle,
      onClose: props.onClose,
      active: props.active,
    };

    this.dismiss = this.dismiss.bind(this);
  }

  dismiss() {
    if (this.state.onClose) {
      this.state.onClose(this);
    } else {
      const stateCopy = Object.assign({}, this.state);
      stateCopy.active = false;
      this.updateState(stateCopy);
    }
  }

  render() {
    let classNames = `Modal ${this.state.modalStyle}`;

    if (this.state.active === false) {
      classNames += ' Hidden';
    }

    return (
      <div className={classNames}>
        <div className="ModalContent">
          {this.props.children}
          <div className="ModalFooter">
            <Button label="Dismiss" onCallback={this.dismiss} />
          </div>
        </div>
      </div>
    );
  }
}

Modal.defaultProps = {
  modalStyle: 'LayoutDark',
  active: false,
  onClose: null,
};

Modal.propTypes = {
  modalStyle: React.PropTypes.string,
  active: React.PropTypes.bool,
  onClose: React.PropTypes.func,
};
