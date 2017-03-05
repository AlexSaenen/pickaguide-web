import React from 'react';

import { Button } from 'layout/Button.jsx';
import { PropsComponent } from 'base/PropsComponent.jsx';

import 'scss/components/base/modal.scss';
import 'scss/components/base/layout.scss';


export class Modal extends PropsComponent {

  constructor(props, context) {
    super(props, context);

    this.state = props;
    this.dismiss = this.dismiss.bind(this);
  }

  dismiss() {
    const stateCopy = Object.assign({}, this.state);
    stateCopy.active = false;
    this.updateState(stateCopy);
  }

  render() {
    let classNames = `ModalContainer ${this.state.modalStyle}`;

    if (this.state.active === false) {
      classNames += ' Hidden';
    }

    return (
      <div className={classNames}>
        <div className="ModalContent">
          {this.state.children}
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
};

Modal.propTypes = {
  children: React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.array]),
  modalStyle: React.PropTypes.string,
  active: React.PropTypes.bool,
};
