import React from 'react';
import AuthStore from '../stores/Auth.js';
const _ = require('lodash');

export class AuthDependent extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.auth = props.auth;
    this.unauth = props.unauth && !props.auth;
    this.className = props.className;

    this.state = {
      children: props.children,
      isVisible: this._isVisible(AuthStore.getState().token),
    };

    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    AuthStore.listen(this.onChange);
  }

  componentWillReceiveProps(props) {
    const stateCopy = Object.assign({}, this.state);
    stateCopy.children = props.children;
    this._alterState(stateCopy);
  }

  componentWillUnmount() {
    AuthStore.unlisten(this.onChange);
  }

  onChange(store) {
    const stateCopy = Object.assign({}, this.state);
    stateCopy.isVisible = this._isVisible(store.token);
    this._alterState(stateCopy);
  }

  _alterState(newState) {
    if (_.isEqual(newState, this.state) === false) {
      this.setState(newState);
    }
  }

  _isVisible(token) {
    return (token === null ? (this.unauth || !this.auth) : (this.auth || !this.unauth));
  }

  render() {
    return (
      <div className={`${this.className}${this.state.isVisible ? '' : ' Hidden'}`}>
        {this.state.children}
      </div>
    );
  }
}

AuthDependent.defaultProps = {
  auth: false,
  unauth: false,
};

AuthDependent.propTypes = {
  children: React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.array]),
  className: React.PropTypes.string,
  auth: React.PropTypes.bool,
  unauth: React.PropTypes.bool,
};
