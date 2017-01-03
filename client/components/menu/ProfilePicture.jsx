import React from 'react';
import { Link } from 'react-router';

import ProfileStore from '../../stores/Profile.js';
import { AuthDependent } from '../AuthDependent.jsx';
const _ = require('lodash');

import 'scss/components/menu/_mainMenu.scss';

export class ProfilePicture extends React.Component {
  constructor(props, context) {
    super(props, context);

    const profile = ProfileStore.getState().profile || { photoUrl: '' };
    this.state = { url: profile.photoUrl };
    this.onChange = this.onChange.bind(this);
    this.props = props;
  }

  componentDidMount() {
    ProfileStore.listen(this.onChange);
  }

  componentWillUnmount() {
    ProfileStore.unlisten(this.onChange);
  }

  onChange(store) {
    const stateCopy = Object.assign({}, this.state);

    if (store.profile) {
      stateCopy.url = store.profile.photoUrl;
      if (_.isEqual(stateCopy, this.state) === false) {
        this.setState(stateCopy);
      }
    }
  }

  render() {
    return (
      <AuthDependent className="AccountLogo" {...this.props}>
        <Link to={'/profile'}>
          <img src={this.state.url} alt="Profile" />
        </Link>
      </AuthDependent>
    );
  }
}
