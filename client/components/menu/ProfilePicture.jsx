import React from 'react';
import { Link } from 'react-router';

import ProfileStore from '../../stores/Profile.js';
import { AuthDependent } from '../AuthDependent.jsx';
const _ = require('lodash');

import 'scss/components/menu/_mainMenu.scss';

export class ProfilePicture extends React.Component {
  constructor(props, context) {
    super(props, context);

    const profile = ProfileStore.getState().profile || { photoUrl: 'https://www.soundstream.tv/assets/default_profile-e08597880fc222202f22984a4f1966a29b108e856a3fb935072bfbbc302a4b73.png' };
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
    console.log('onChange()', store);
    const stateCopy = Object.assign({}, this.state);

    if (store.profile) {
      stateCopy.url = store.profile.photoUrl;
      if (_.isEqual(stateCopy, this.state) === false) {
        this.setState(stateCopy);
      }
    }
  }

  render() {
    const imageStyle = {
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center top',
      backgroundImage: `${this.state.url}`,
    };

    console.log('render()');

    return (
      <AuthDependent className="AccountLogo" {...this.props}>
        <Link to={'/profile'}>
          <div key="profileImage" style={imageStyle} />
        </Link>
      </AuthDependent>
    );
  }
}
