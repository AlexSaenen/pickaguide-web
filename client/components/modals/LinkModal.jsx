import React from 'react';

import { PropsComponent } from 'base/PropsComponent.jsx';
import { ModalForm } from 'view/ModalForm.jsx';
import { Title } from 'layout/Title.jsx';
import { TextInput } from 'form/TextInput.jsx';


export class LinkModal extends PropsComponent {

  constructor(props, context) {
    super(props, context);

    this.state = {
      title: props.title,
      inputLabel: props.inputLabel,
      inputHolder: props.inputHolder,
    };
  }

  componentWillReceiveProps(props) {
    console.log('LinkModal.componentWillReceiveProps()', props);
    super.componentWillReceiveProps(props);
  }

  render() {
    return (
      <ModalForm {...this.props} modalStyle="Small">
        <Title>{this.state.title}</Title>
        <TextInput required label={this.state.inputLabel} placeholder={this.state.inputHolder} />
      </ModalForm>
    );
  }
}

LinkModal.defaultProps = {
  title: 'Enter link',
  inputLabel: 'link',
};

LinkModal.propTypes = {
  title: React.PropTypes.string,
  inputLabel: React.PropTypes.string,
  inputHolder: React.PropTypes.string,
};
