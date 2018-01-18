import React from 'react';
import shouldPureComponentUpdate from 'react-addons-shallow-compare';
import GoogleMapReact from 'google-map-react';
import controllable from 'react-controllables';

import MyPositionsGuidesWithControllableHover from 'layout/user/confHoverGoogleMap.jsx';

import { K_CIRCLE_SIZE, K_STICK_SIZE } from 'layout/user/confGoogleMap.js';
import { strings } from './AdvertMap_lang.js';

const geocoder = new google.maps.Geocoder(); // eslint-disable-line

export const transformAdressToCoordinates = (fields, callback) => {
  let address = `${fields.city}, ${fields.country}`;
  if (fields.location) {
    address = `${fields.location}, ${fields.city}, ${fields.country}`;
  }

  geocoder.geocode({ address }, callback);
};

class AdvertMap extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      center: { lat: null, lng: null },
      zoom: props.zoom,
      advertLocation: [],
    };

    this.updateCoordinates = this.updateCoordinates.bind(this);
  }

  componentDidMount() {
    const { city, country, location } = this.props;
    transformAdressToCoordinates({ city, country, location }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK) { // eslint-disable-line
        this.updateCoordinates(this.props.zoom, results[0].geometry.location.lat(), results[0].geometry.location.lng());
        return;
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    const { city, country, location } = nextProps;
    transformAdressToCoordinates({ city, country, location }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK) { // eslint-disable-line
        this.updateCoordinates(nextProps.zoom, results[0].geometry.location.lat(), results[0].geometry.location.lng());
        return;
      }
    });
  }

  updateCoordinates(zoom, lat, lng) {
    this.setState({
      zoom,
      center: {
        lat,
        lng,
      },
    });
  }

  _distanceToMouse(markerPos, mousePos, markerProps) {
    const x = markerPos.x;
    const y = markerPos.y - K_STICK_SIZE - K_CIRCLE_SIZE / 2;
    const distanceKoef = markerProps.text !== 'A' ? 1.5 : 1;

    return distanceKoef * Math.sqrt((x - mousePos.x) * (x - mousePos.x) + (y - mousePos.y) * (y - mousePos.y));
  }

  render() {
    if (this.state.center.lat === null) {
      return <div />;
    }

    return (
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyBE5bc1-R4JKw8qENkfQQg9VBM8sZ2GMlY' }}
        center={this.state.center}
        zoom={this.state.zoom}
        hoverDistance={K_CIRCLE_SIZE / 2}
        distanceToMouse={this._distanceToMouse}
      >
        <MyPositionsGuidesWithControllableHover
          advertId=""
          {...this.state.center}
          own={false}
          key={2}
          text={strings.text}
          description={strings.description}
        />
      </GoogleMapReact>
    );
  }
}

AdvertMap.propTypes = {
  location: React.PropTypes.string,
  city: React.PropTypes.string,
  country: React.PropTypes.string,
  center: React.PropTypes.object,
  zoom: React.PropTypes.number,
  clickKey: React.PropTypes.string, // @controllable
  onCenterChange: React.PropTypes.func, // @controllable generated fn
  onZoomChange: React.PropTypes.func, // @controllable generated fn
  onHoverKeyChange: React.PropTypes.func, // @controllable generated fn
  guideCoor: React.PropTypes.array,
  advertLocation: React.PropTypes.array,
};

AdvertMap = controllable(AdvertMap, ['center', 'zoom', 'hoverKey', 'clickKey']); // eslint-disable-line
export default AdvertMap;
AdvertMap.prototype.shouldComponentUpdate = shouldPureComponentUpdate;
